import { GoogleGenAI } from "@google/genai";
import prisma from "../utils/prisma";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string })



async function expandTask(req: any, res: any) {
    try {

        const { description } = req.body
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Break down this feature into 3-5 small developer subtasks. Return only a JSON array of strings, no explanation: "${description}"`
        })
        const raw = response.text ?? ''
        const cleaned = raw.replace(/```json|```/g, '').trim()
        const subtasks = JSON.parse(cleaned)

        return res.status(200).json({
            subtasks
        })
    } catch (err) {
        res.status(500).json({ message: "Failed to expand task", error: err })
    }
}

async function reviewCode(req: any, res: any) {
    try {
        const { code } = req.body
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Review this code and return a JSON object with exactly these fields:
                    - bugs: array of strings (actual bugs or errors found)
                    - improvements: array of strings (suggestions to improve the code)
                    - score: number from 1-10 (overall code quality)
                    - summary: string (one sentence overall assessment)

                    Code:
                    ${code}

                    Return only valid JSON, no markdown, no explanation.`
        })

         const raw = response.text ?? ''
        const cleaned = raw.replace(/```json|```/g, '').trim()
        const review = JSON.parse(cleaned)
        return res.status(200).json({
            review
        })


    }catch(err){
        res.status(500).json({ message: "Failed to review given code snippet", error: err })
    }
}

async function generateStandup(req:any , res:any) {
    try{

        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const sessions= await prisma.pomodoroSession.findMany({
            where:{
                userId : req.userId,
                createdAt:{gte:today}
            }
        })
        const response = await ai.models.generateContent({
            model:'gemini-2.5-flash',
            contents: `I completed ${sessions.length} Pomodoro sessions today working on: ${sessions.map(s=>s.taskTitle).filter(Boolean)}. Draft a short developer standup in 2-3 sentences.`
        })
        
        res.status(200).json({
            standup : response.text
        })
    }catch(err){
        res.status(500).json({ message: "Failed to generate standup", error: err })
    }

}

export { expandTask , reviewCode , generateStandup}