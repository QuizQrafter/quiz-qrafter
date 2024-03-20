export interface DocumentService {
  upload(file: File): Promise<void>;
}
