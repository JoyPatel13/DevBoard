import rateLimit from 'express-rate-limit'

const aiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, 
    message : {error : "Too many requests , please try again later."}
    
}  )


export {aiRateLimiter}