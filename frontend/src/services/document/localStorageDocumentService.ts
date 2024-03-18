import { AuthService } from "../auth/types";
import { DocumentService } from "./types";

/**
 * for testing and development ONLY
 */
export class LocalStorageDocumentService implements DocumentService {
  constructor(private readonly authService: AuthService) {}

  async upload(file: File): Promise<void> {
    const user = await this.authService.currentUser();
    if (!user) {
      return Promise.reject("Unauthenticated");
    }
    const fileKey = `user:${user.email}|file:${file.name}`;
    const content = URL.createObjectURL(file);

    localStorage.setItem(fileKey, content);
  }
}
