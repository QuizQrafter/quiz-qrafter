-- CreateTable
CREATE TABLE "quizzes" (
    "id" SERIAL NOT NULL,
    "urlPdf" TEXT NOT NULL,
    "documentId" INTEGER NOT NULL,

    CONSTRAINT "quizzes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quizzes" ADD CONSTRAINT "quizzes_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
