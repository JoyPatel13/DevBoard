import { Router } from "express";
import { VerifyUser } from "../middleware/auth.middleware";
import { expandTask, reviewCode } from "../controllers/ai.controller";
import { aiRateLimiter } from "../middleware/rateLimit.middleware"; 

const aiRouter = Router()

aiRouter.post('/expand' ,aiRateLimiter , VerifyUser,expandTask)

aiRouter.post('/review' ,aiRateLimiter, VerifyUser ,reviewCode)

export {aiRouter}