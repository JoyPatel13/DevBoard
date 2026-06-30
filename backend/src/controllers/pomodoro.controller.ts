import prisma from "../utils/prisma";

async function createSession(req:any ,res:any){
    try{
        const {duration , taskTitle} = req.body
        const userId = req.userId

        const newSession = await prisma.pomodoroSession.create({
            data:{
                userId : userId,
                duration,
                taskTitle

            }
        })
        
        res.status(200).json({
            message : "Session created successfully",
            newSession
        })
    }catch(err){
        res.status(500).json({
            message:"Unable to create session",
            error : err
        })
    }
}

export {createSession}