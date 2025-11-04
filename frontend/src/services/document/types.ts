export interface DocumentService {
  upload(file: File): Promise<{ quizMarkdown: string }>
}
