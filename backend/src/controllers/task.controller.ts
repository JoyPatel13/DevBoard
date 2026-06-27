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


export {createTask , getTask}