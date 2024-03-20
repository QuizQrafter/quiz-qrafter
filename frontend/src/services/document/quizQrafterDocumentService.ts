import { DocumentService } from "./types";

export class QuizQrafterDocumentService implements DocumentService {
  constructor(private readonly baseURL: URL) {}

  async upload(file: File): Promise<void> {
    // TODO: implement this later
  }
}
