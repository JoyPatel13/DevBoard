import { Router } from "express";
import { VerifyUser } from "../middleware/auth.middleware";
import { expandTask } from "../controllers/ai.controller";
const aiRouter = Router()

aiRouter.post('/expand' , VerifyUser ,expandTask)

export {aiRouter}