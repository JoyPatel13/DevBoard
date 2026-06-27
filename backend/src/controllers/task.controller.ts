import prisma from "../utils/prisma";

async function createTask(req:any , res:any) {
    try{

        const {title , priority} = req.body
        const userId = req.userId 
        const newtask =  await prisma.task.create({
            data : {
                userId : userId,
                title ,
                priority,
                
                
            }
        }) 
        return res.status(201).json({
            message : "Task Successfully created",
            newtask
        })
    }catch(err){
        res.status(500).json({
            message : "Unable to create task",
            error : err
        })
    }

}

async function getTask(req:any , res:any) {
    try{

        const userId = req.userId 
        const Alltasks = await prisma.task.findMany({
            where:{
                userId : userId
            }
        })
        res.status(201).json({
            message : "Tasks fetched successfully",
            tasks : Alltasks
        })
    }catch(err){
        res.send(500).json({
            message : "Failed to fetch tasks",
            error : err
        })
    }
       
}

export {createTask , getTask}