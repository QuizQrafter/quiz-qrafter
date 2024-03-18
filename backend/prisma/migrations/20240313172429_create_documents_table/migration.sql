-- CreateTable
CREATE TABLE "documents" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "transcriptionURL" TEXT NOT NULL,
    "rawURL" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "documents_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "documents" ADD CONSTRAINT "documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
