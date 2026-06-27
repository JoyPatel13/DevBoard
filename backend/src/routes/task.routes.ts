import { VerifyUser } from "../middleware/auth.middleware";
import {createTask , getTask , updateTask , deleteTask} from '../controllers/task.controller'
import { Router } from "express";
const TaskRouter = Router();

TaskRouter.post('/create' , VerifyUser , createTask)

TaskRouter.get('/' , VerifyUser , getTask)

TaskRouter.put('/update/:id' , VerifyUser , updateTask )

TaskRouter.delete('/delete/:id' , VerifyUser , deleteTask)

export {TaskRouter}