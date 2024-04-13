import { DocumentService } from "./types";

export class QuizQrafterDocumentService implements DocumentService {
  constructor(private readonly baseURL: URL) {}

  async upload(file: File): Promise<void> {
    const data = new FormData();
    data.append("file", file, file.name);
    await fetch(new URL("/api/v1/document/upload", this.baseURL), {
      method: "POST",
      credentials: "include",
      body: data,
    });
  }
}
