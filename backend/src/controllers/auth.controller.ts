import bcrypt from "bcryptjs";
import prisma from "../utils/prisma";
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt.utils.js'
import { access } from "node:fs";
import { error } from "node:console";


async function registerController(req: any, res: any) {
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
            message: "User registered successfully",
            name: user.name,
            email: user.email
        })
    } catch (err) {
        res.status(500).json({
            message: "Some error occured",
            error: err
        })
    }
}


async function loginController(req: any, res: any) {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (!user) {
            return res.status(400).json({
                message: "Email does not exists , please register !"
            })
        }

        const check = await bcrypt.compare(password, user.password)
        if (!check) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        const accessToken = generateAccessToken(user.id)
        const refreshToken = generateRefreshToken(user.id)
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })

        return res.status(200).json({
            message: "User logged-in successfully",
            accessToken,
            email: user.email,
            name: user.name,
        })
    }catch(err){
        res.status(500).json({
            message : "Some Error occurred",
            error : err
        })
    }
}

async function refreshController(req:any , res:any) {
    try{

        const refreshToken = req.cookies.refreshToken
        
        if(!refreshToken){
            return res.status(401).json({
                message : "No refresh token found"
            })
        }
        const decoded = verifyToken(refreshToken , process.env.REFRESH_TOKEN_SECRET as string) as any
        if(!decoded){
            return res.status(401).json({
                message : "Invalid refresh token"
            })
        }
        const newAccessToken = generateAccessToken(decoded.userId)
        return res.status(200).json({
            accessToken : newAccessToken
        })
    }catch(err){
        res.status(500).json({
            message : "Some error occurred",
            error : err
        })
    }

}

export {registerController , loginController , refreshController}