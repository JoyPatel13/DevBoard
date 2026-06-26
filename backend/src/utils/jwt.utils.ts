import jwt from 'jsonwebtoken'

function generateAccessToken(userId: string){
    let token = jwt.sign({
        userId 
    } , process.env.ACCESS_TOKEN_SECRET as string , {
        expiresIn:'15m'
    })
    return token;
}

function generateRefreshToken(userId:string){
    let token = jwt.sign({
        userId
    } , process.env.REFRESH_TOKEN_SECRET as string,{
        expiresIn:'7d'
    })
    return token
}


function verifyToken(token:string , secret:string){
    try{

        return jwt.verify(token , secret)
    }
    catch(err){
        console.log(err);
    }

}

export { generateAccessToken, generateRefreshToken, verifyToken }