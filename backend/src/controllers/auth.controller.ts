import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";


async function register(req: any, res: any) {
    try {

        const { name, password, email } = req.body
        const hash = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hash
            }
        })
        res.status(201).json({
            message : "User registered successfully",
            name : user.name ,
            email : user.email
        })
    }catch(err){
        res.status(500).json({
            message : "Some error occured",
            error : err
        })
    }
}