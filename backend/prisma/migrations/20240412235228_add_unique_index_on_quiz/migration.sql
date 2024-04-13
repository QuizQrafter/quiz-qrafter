/*
  Warnings:

  - A unique constraint covering the columns `[documentId]` on the table `quizzes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quizzes_documentId_key" ON "quizzes"("documentId");
