import { DocumentProcessorServiceClient } from "@google-cloud/documentai"
import { Storage } from "@google-cloud/storage"
import { Router } from "express"
import multer from "multer"
import prisma from "../../database"
import { restrict } from "./auth"

const {
  GCLOUD_PROJECT_ID,
  GCLOUD_LOCATION = "us",
  GCLOUD_DOCUMENT_PROCESSOR_ID,
  GOOGLE_APPLICATION_CREDENTIALS,
} = process.env
const router = Router()

const multerMiddleware = multer({ storage: multer.memoryStorage() })
router.post(
  "/upload",
  restrict,
  multerMiddleware.single("file"),
  async (req, res) => {
    try {
      // @ts-expect-error
      const userId = req.session.userId
      const user = await prisma.user.findUnique({ where: { id: userId } })
      if (user === null) {
        // user does not exist
        console.error(`User-${userId} does not exist`)
        return res.status(401 /* Unauthorized */)
      }

      const {
        originalname: originalFileName,
        buffer,
        size,
        mimetype,
      } = req.file!

      // Transcribe document
      const client = new DocumentProcessorServiceClient({
        keyFile: GOOGLE_APPLICATION_CREDENTIALS!,
      })
      const [result] = await client.processDocument({
        name: `projects/${GCLOUD_PROJECT_ID}/locations/${GCLOUD_LOCATION}/processors/${GCLOUD_DOCUMENT_PROCESSOR_ID}`,
        rawDocument: {
          content: buffer,
          mimeType: mimetype,
        },
      })
      const document = result.document?.text ?? ""

      // Upload raw document and transcripted file to bucket
      const storage = new Storage({ keyFile: GOOGLE_APPLICATION_CREDENTIALS! })
      const bucket = storage.bucket("quizqrafter-documents")
      const rawFile = bucket.file(`u${userId}-${originalFileName}`)
      const transcriptedFile = bucket.file(`${rawFile.name}.transcript`)
      await Promise.all([rawFile.save(buffer), transcriptedFile.save(document)])

      console.log(
        `Uploaded ${rawFile.name}, ${transcriptedFile.name} to ${bucket.name}`,
      )

      await prisma.document.create({
        data: {
          rawURL: rawFile.cloudStorageURI.href,
          size: size,
          transcriptionURL: transcriptedFile.cloudStorageURI.href,
          userId: userId,
        },
      })

      return res.status(200).json({ document: document })
    } catch (error) {
      console.error(error)
      res.sendStatus(500)
    }
  },
)

export default router
