import { utapi } from 'uploadthing/server';
import fs from 'fs';

export async function uploadFiles(filePath: string) {
  try {
    const videoBuffer = fs.readFileSync(filePath);
    const videoBlob = new Blob([videoBuffer]);
    const videoFile = new File([videoBlob], 'temp_video.mp4', {
      type: 'video/mp4',
    });

    const uploadedFiles = await utapi.uploadFiles([videoFile]);

    return uploadedFiles;
  } catch (error) {
    console.error('Error uploading video:', error);
    throw error;
  }
}
