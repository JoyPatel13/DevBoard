import { Router } from "express";
import { VerifyUser } from "../middleware/auth.middleware";
import { expandTask, reviewCode } from "../controllers/ai.controller";

const aiRouter = Router()

aiRouter.post('/expand' , VerifyUser ,expandTask)

aiRouter.post('/review' , VerifyUser , reviewCode)

export {aiRouter}