import { Router } from "express";
import { VerifyUser } from "../middleware/auth.middleware";
import { createSession, getSession } from "../controllers/pomodoro.controller";

const pomodoroRouter = Router()

pomodoroRouter.post('/create' , VerifyUser , createSession)

pomodoroRouter.get('/' , VerifyUser , getSession)

export {pomodoroRouter}