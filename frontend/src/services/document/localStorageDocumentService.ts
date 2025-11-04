import type { AuthService } from "../auth/types"
import type { DocumentService } from "./types"

/**
 * for testing and development ONLY
 */
export class LocalStorageDocumentService implements DocumentService {
  constructor(private readonly authService: AuthService) {}

  async upload(file: File): Promise<{ quizMarkdown: string }> {
    const user = await this.authService.currentUser()
    if (!user) {
      return Promise.reject(new Error("Unauthenticated"))
    }

    const fileKey = `user:${user.email}|file:${file.name}`
    const content = URL.createObjectURL(file)
    localStorage.setItem(fileKey, content)

    // Simulate generating markdown content from the file
    const fakeMarkdown = `# Markdown Content for ${file.name}\nSimulated content for testing purposes.`

    // Instead of just storing the file, also return markdown content
    return { quizMarkdown: fakeMarkdown }
  }
}
