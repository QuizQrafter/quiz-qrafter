import type { DocumentService } from "./types"

export class QuizQrafterDocumentService implements DocumentService {
  constructor(private readonly baseURL: URL) {}

  async upload(file: File): Promise<{ quizMarkdown: string }> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(
      new URL("/api/v1/document/upload", this.baseURL),
      {
        method: "POST",
        credentials: "include",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      },
    )

    if (!response.ok) {
      throw new Error("Failed to upload file")
    }

    const result = await response.json()
    return { quizMarkdown: result.quizMarkdown } // Assuming the backend sends this key
  }
}
