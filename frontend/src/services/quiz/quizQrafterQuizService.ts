import type { QuizService } from "./types"

export class QuizQrafterQuizService implements QuizService {
  constructor(private readonly baseURL: URL) {}

  async generateMD(filename: string): Promise<string> {
    const url = new URL(`/api/v1/quiz/new`, this.baseURL)
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "text/markdown",
      },
      body: JSON.stringify({
        filename,
      }),
    })
    const markdown = await res.text()
    return markdown
  }

  async generatePDF(filename: string): Promise<File> {
    const url = new URL(`/api/v1/quiz/new`, this.baseURL)
    const res = await fetch(url, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
      },
      body: JSON.stringify({
        filename,
      }),
    })
    const blob = await res.blob()
    return new File([blob], filename)
  }

  async downloadMD(filename: string): Promise<string> {
    const url = new URL(`/api/v1/quiz/download/${filename}`, this.baseURL)
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "text/markdown",
      },
    })
    const markdown = await res.text()
    return markdown
  }

  async downloadPDF(filename: string): Promise<File> {
    const url = new URL(`/api/v1/quiz/download/${filename}`, this.baseURL)
    const res = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/pdf",
      },
    })
    const blob = await res.blob()
    return new File([blob], filename)
  }
}
