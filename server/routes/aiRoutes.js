import express from "express";
import { auth } from "../middlewares/auth.js";
import { generateArticle, generateBlogTitle, generateImage } from "../controllers/aiController.js";

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

export default aiRouter