export interface QuizService {
  generateMD(filename: string): Promise<string>;
  generatePDF(filename: string): Promise<File>;
  downloadMD(filename: string): Promise<string>;
  downloadPDF(filename: string): Promise<File>;
}
