import { Storage } from "@google-cloud/storage";
import { Router } from "express";
import mdToPdf from "md-to-pdf";
import OpenAI from "openai";
import prisma from "../../database";
import { restrict } from "./auth";
import { decode } from "punycode";

const { GCLOUD_KEY_FILEPATH } = process.env;

const router = Router();

/*
For formatting response, set Accept request header to
- (PDF)      Accept: application/pdf
- (Markdown) Accept: text/markdown
*/
router.post("/new", restrict, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.session.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user === null) {
      // user does not exist
      console.error(`User-${userId} does not exist`);
      return res.sendStatus(401 /* Unauthorized */);
    }

    const filename = req.body.filename;

    // Upload raw document and transcripted file to bucket
    const storage = new Storage({ keyFile: GCLOUD_KEY_FILEPATH! });
    const bucket = storage.bucket("quizqrafter-documents");
    const transcriptedFile = bucket.file(`u${userId}-${filename}.transcript`);
    const dbDoc = await prisma.document.findFirst({
      where: {
        transcriptionURL: transcriptedFile.cloudStorageURI.href,
      },
    });
    if (dbDoc === null) {
      console.error(`Document does not exist`);
      return res.sendStatus(400 /* Bad Request */);
    }
    const [file] = await transcriptedFile.download();
    const query = `
    You are a quiz bot. Please prioritize keeping the original precise data from the input text in your outputted quiz. You don't make stuff up in your study quiz. Your tasks are as follows:

    only output the quiz with no additional text, please.

    In the quiz you create, ask multiple choice questions, short response questions, and true or false questions.

    Only create the quiz based on the content within the inputted note.

    Please output an answer key

    Generate 10 questions

    Output in markdown with the answer key at the bottom
    `;
    const openai = new OpenAI();
    const transcription = file.toString("utf-8");
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: query },
        { role: "user", content: transcription },
      ],
      model: "gpt-3.5-turbo",
    });

    const quizContent = completion.choices[0].message.content ?? "";
    if (req.headers.accept === "text/markdown") {
      return res.status(200 /* OK */).send(quizContent);
    }
    const pdf = await mdToPdf({ content: quizContent });

    // Upload raw document and transcripted file to bucket
    const quizbucket = storage.bucket("quizqrafter-quizzes");
    const quizfile = quizbucket.file(`u${userId}-${filename}-quiz.pdf`);
    await quizfile.save(pdf.content);

    const prevQuiz = await prisma.quiz.findFirst({
      where: {
        documentId: dbDoc.id,
      },
    });
    if (prevQuiz === null) {
      const quiz = await prisma.quiz.create({
        data: {
          documentId: dbDoc.id,
          urlPdf: quizfile.cloudStorageURI.href,
        },
      });
    } else {
      const quiz = await prisma.quiz.update({
        where: { documentId: dbDoc.id },
        data: {
          urlPdf: quizfile.cloudStorageURI.href,
        },
      });
    }

    res.setHeader("Content-disposition", "attachment; filename=quiz.pdf");
    res.status(200 /* OK */).send(pdf.content);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.get("/download/:filename", restrict, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.session.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user === null) {
      // user does not exist
      console.error(`User-${userId} does not exist`);
      return res.sendStatus(401 /* Unauthorized */);
    }

    const filename = req.params.filename;
    const storage = new Storage({ keyFile: GCLOUD_KEY_FILEPATH! });
    const bucket = storage.bucket("quizqrafter-documents");
    const transcriptedFile = bucket.file(`u${userId}-${filename}.transcript`);
    const dbDoc = await prisma.document.findFirst({
      where: {
        transcriptionURL: transcriptedFile.cloudStorageURI.href,
      },
    });
    if (dbDoc === null) {
      console.error(`Document does not exist`);
      return res.sendStatus(400 /* Bad Request */);
    }
    const dbQuiz = await prisma.quiz.findUnique({
      where: {
        documentId: dbDoc.id,
      },
    });
    if (dbQuiz === null) {
      console.error(`Quiz does not exist`);
      return res.sendStatus(400 /* Bad Request */);
    }
    const fname = dbQuiz.urlPdf.replace("gs://quizqrafter-quizzes/", ""); // eg. u1-note.pdf-quiz.pdf
    const [pdfQuiz] = await storage
      .bucket("quizqrafter-quizzes")
      .file(fname)
      .download();
    res.setHeader("Content-disposition", "attachment; filename=quiz.pdf");
    res.setHeader("Content-type", "application/pdf");
    res.status(200 /* OK */).send(pdfQuiz);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.delete("/delete/:filename", restrict, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.session.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user === null) {
      // user does not exist
      console.error(`User-${userId} does not exist`);
      return res.sendStatus(401 /* Unauthorized */);
    }
    const filename = decodeURIComponent(req.params.filename);
    const storage = new Storage({ keyFile: GCLOUD_KEY_FILEPATH! });
    const bucket = storage.bucket("quizqrafter-documents");
    const transcriptedFile = bucket.file(`u${userId}-${filename}.transcript`);
    const dbDoc = await prisma.document.findFirst({
      where: {
        transcriptionURL: transcriptedFile.cloudStorageURI.href,
      },
    });
    if (dbDoc === null) {
      console.error(`Document does not exist`);
      return res.sendStatus(400 /* Bad Request */);
    }
    const dbQuiz = await prisma.quiz.findUnique({
      where: {
        documentId: dbDoc.id,
      },
    });
    if (dbQuiz === null) {
      console.error(`Quiz does not exist`);
      return res.sendStatus(400 /* Bad Request */);
    }
    const fname = dbQuiz.urlPdf.replace("gs://quizqrafter-quizzes/", ""); // eg. u1-note.pdf-quiz.pdf
    const [response] = await storage
      .bucket("quizqrafter-quizzes")
      .file(fname)
      .delete();

    await prisma.quiz.delete({
      where: {
        id: dbQuiz.id
      }
    })

    return res.sendStatus(response.statusCode)


  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
