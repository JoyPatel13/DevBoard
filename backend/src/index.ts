import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './routes/auth.routes'
import cookieParser from 'cookie-parser'
import { TaskRouter } from './routes/task.routes'
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : 'http://localhost:5173',
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth' , router)

app.use('/api/tasks' , TaskRouter)

app.get('/health' ,(req,res)=>{
    res.json({
        status:"ok",
        message:"DevBoard API is running"
    })
})

app.listen(PORT , ()=>{
    console.log(`App Listening on port ${PORT}`)
})