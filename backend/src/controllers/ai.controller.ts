import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY as string})



async function expandTask(req:any , res:any){
    try{

        const {description} = req.body
        const response = await ai.models.generateContent({
            model : 'gemini-2.5-flash',
            contents: `Break down this feature into 3-5 small developer subtasks. Return only a JSON array of strings, no explanation: "${description}"`
        })
        return res.status(200).json({
            subtasks : response.text
        })
    }catch(err){
        res.status(500).json({ message: "Failed to expand task", error: err })
    }
}

export {expandTask}