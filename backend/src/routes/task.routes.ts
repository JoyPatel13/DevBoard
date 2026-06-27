import { VerifyUser } from "../middleware/auth.middleware";
import {createTask , getTask , updateTask , deleteTask} from '../controllers/task.controller'
import { Router } from "express";
const router = Router();

router.post('/create' , VerifyUser , createTask)

router.get('/' , VerifyUser , getTask)

router.put('/update/:id' , VerifyUser , updateTask )

router.delete('/delete/:id' , VerifyUser , deleteTask)

export {router}