import fs from 'fs';
import { Message } from 'discord.js';
import { uploadFiles } from './api/uploadthing/upload';
import { videoPath } from './utils/paths';
import { UploadError, UploadedFile } from './utils/interface';

export async function handleMessage(message: Message) {
  if (message.content.startsWith('!upload')) {
    if (message.attachments.size === 0) {
      message.reply('Please attach a video to your message.');
      return;
    }

    const videoAttachment = message.attachments.first();

    if (videoAttachment) {
      try {
        const response = await fetch(videoAttachment.url);
        const videoBuffer = await response.arrayBuffer();

        fs.writeFileSync(videoPath, videoBuffer);
        const uploadResponses = await uploadFiles(videoPath);

        const uploadedFiles: UploadedFile[] = uploadResponses.map(
          (response) => ({
            data: response.data,
            error: response.error as UploadError | null,
          })
        );

        if (uploadedFiles.length > 0 && uploadedFiles[0].data?.url) {
          message.reply(
            `Video has been saved. You can view it here: ${uploadedFiles[0].data.url}`
          );
          console.log(uploadedFiles);
        } else {
          message.reply(
            'An error occurred while saving or uploading the video.'
          );
        }
      } catch (error) {
        console.error('Error saving or uploading video:', error);
        message.reply('An error occurred while saving or uploading the video.');
      } finally {
        if (fs.existsSync(videoPath)) {
          fs.unlinkSync(videoPath);
          console.log(`Deleted video file: ${videoPath}`);
        }
      }
    }
  }
}
