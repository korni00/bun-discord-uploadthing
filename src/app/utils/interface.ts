export interface UploadedFile {
  data: {
    key: string;
    url: string;
    name: string;
    size: number;
  } | null;
  error: UploadError | null;
}

export type UploadError = string;
