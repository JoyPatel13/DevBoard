import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function CodeReview(){
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [aiReview, setAiReview] = useState<any>(null)

    const navigate = useNavigate()

    async function handleReview(){
        if(!code) return
        try{
            setLoading(true)
            const token = localStorage.getItem('accessToken')
            const response = await axios.post('http://localhost:5000/api/ai/review' , {code} ,{
                headers:{
                    Authorization :`Bearer ${token}`
                }
            })
            setAiReview(response.data.review)
            

        }catch(err){
            console.log(err)
        }finally{
            setLoading(false)
        }

    }
    return(
       <div className="flex min-h-screen bg-[#0f1117] text-white">
            <Sidebar activePage="Code Review" />

            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold">AI Code Reviewer</h1>
                    <p className="text-gray-500 text-sm mt-1">Paste your code and get instant AI feedback</p>
                </div>

                {/* Input */}
                <div className="bg-[#161b27] border border-white/5 rounded-xl p-6 mb-6">
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-3 block">Paste Your Code</label>
                    <textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Paste your code snippet here..."
                        rows={8}
                        className="w-full bg-[#0f1117] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all resize-none font-mono"
                    />
                    <button
                        onClick={handleReview}
                        disabled={loading}
                        className="mt-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
                    >
                        {loading ? 'Reviewing...' : '✦ Review Code'}
                    </button>
                </div>

                {/* Results */}
                {aiReview && (
                    <div className="flex flex-col gap-4">
                        {/* Summary */}
                        <div className="bg-[#161b27] border border-white/5 rounded-xl p-6">
                            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Summary</h2>
                            <p className="text-sm text-gray-300">{aiReview.summary}</p>
                        </div>

                        {/* Score */}
                        <div className="bg-[#161b27] border border-white/5 rounded-xl p-6">
                            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-2">Score</h2>
                            <p className="text-3xl font-bold text-purple-400">{aiReview.score}<span className="text-sm text-gray-500">/10</span></p>
                        </div>

                        {/* Bugs */}
                        <div className="bg-[#161b27] border border-white/5 rounded-xl p-6">
                            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-3">Bugs</h2>
                            {aiReview.bugs.length === 0 ? (
                                <p className="text-sm text-green-400">No bugs found 🎉</p>
                            ) : (
                                <div className="flex flex-col gap-2">
                                    {aiReview.bugs.map((bug: string, i: number) => (
                                        <div key={i} className="bg-[#0f1117] border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-300">
                                            {bug}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Improvements */}
                        <div className="bg-[#161b27] border border-white/5 rounded-xl p-6">
                            <h2 className="text-xs text-gray-400 uppercase tracking-widest mb-3">Improvements</h2>
                            <div className="flex flex-col gap-2">
                                {aiReview.improvements.map((item: string, i: number) => (
                                    <div key={i} className="bg-[#0f1117] border border-purple-500/20 rounded-lg px-4 py-3 text-sm text-gray-300">
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}