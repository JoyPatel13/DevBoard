import { Router } from "express";
import { VerifyUser } from "../middleware/auth.middleware";
import { createSession } from "../controllers/pomodoro.controller";

const pomodoroRouter = Router()

pomodoroRouter.post('/create' , VerifyUser , createSession)

export {pomodoroRouter}