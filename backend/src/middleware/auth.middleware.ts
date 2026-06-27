import {  verifyToken } from '../utils/jwt.utils'

function VerifyUser(req:any,res:any , next :any){
    const authHeader = req.headers.authorization
    const AccessToken = authHeader && authHeader.split(' ')[1]
    if(!AccessToken){
        return res.status(401).json({
            message : "Token not found !"
        })
    }
    const decoded = verifyToken(AccessToken , process.env.ACCESS_TOKEN_SECRET as string)
    if(!decoded){
        return res.status(401).json({
            message: "Invalid or expired token",
            user : req.userId
        })
    }
    req.userId =( decoded as any).userId
    next()
}

export {VerifyUser}