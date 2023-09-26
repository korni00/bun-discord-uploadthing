import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const uploadRouter: FileRouter = {
  imageUploader: f({ video: { maxFileSize: '16MB' } }).onUploadComplete(
    async ({ file }) => {
      console.log('file url', file.url);
    }
  ),
};

export type OurFileRouter = typeof uploadRouter;
