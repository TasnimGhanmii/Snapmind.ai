import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, generateImage, removeBackround, RemoveObject, ResumeReview } from "../controllers/aiController.js";
import { upload } from "../configs/multer.js";


const aiRouter=express.Router();

/*
When a request hits /generate-article:
Express sees the middleware auth first.
Runs auth(req, res, next).
If auth calls next(), Express moves on to generateArticle(req, res).
If auth doesn’t call next() , Express stops the chain, and the route handler never runs. */

aiRouter.post('/generate-article',auth,generateArticle)
aiRouter.post('/generate-blog-title',auth,generateBlogTitle)
aiRouter.post('/generate-image',auth,generateImage)
aiRouter.post('/remove-background',upload.single('image'),auth,removeBackround)
aiRouter.post('/remove-object',upload.single('image'),auth,RemoveObject)
aiRouter.post('/review-resume',upload.single('resume'),auth,ResumeReview)



export default aiRouter