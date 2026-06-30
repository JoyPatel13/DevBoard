import { Router } from "express";
import { VerifyUser } from "../middleware/auth.middleware";


const pomodoroRouter = Router()

pomodoroRouter.post('/pomodoro' , VerifyUser)