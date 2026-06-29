import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AITools() {

    const [description, setDescription] = useState('')
    const [subtasks, setSubtasks] = useState([])
    const [loading, setLoading] = useState(false)
    const [addedTasks, setAddedTasks] = useState<number[]>([])
    const navigate = useNavigate()

    async function handleExpand() {
        if (!description.trim()) return
        try {
            setLoading(true)
            const token = localStorage.getItem('accessToken')
            const response = await axios.post('http://localhost:5000/api/ai/expand', { description }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setSubtasks(response.data.subtasks)
        } catch (err) {
            console.log(err)
        }
        finally {
            setLoading(false)
        }
    }

    async function addToTasks(title: string, index: number) {
        try {
            const token = localStorage.getItem('accessToken')
            await axios.post('http://localhost:5000/api/tasks/create', { title, priority: 'MEDIUM' }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setAddedTasks(prev => [...prev, index])
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="flex min-h-screen bg-[#0f1117] text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-[#161b27] border-r border-white/5 flex flex-col px-4 py-6 gap-1">
                <div className="mb-8 px-3">
                    <span className="text-purple-400 font-bold text-xl tracking-tight">DevBoard</span>
                    <p className="text-xs text-gray-500 mt-1">Productivity Hub</p>
                </div>
                {[
                    { label: "Dashboard", icon: "⊞", path: "/dashboard" },
                    { label: "Tasks", icon: "✓", path: "/tasks" },
                    { label: "Pomodoro", icon: "◷", path: "/pomodoro" },
                    { label: "AI Tools", icon: "✦", path: "/ai" },
                ].map((item) => (
                    <button
                        key={item.label}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${item.label === "AI Tools" ? "text-white bg-white/8" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
                <div className="mt-auto">
                    <button
                        onClick={() => { localStorage.removeItem('accessToken'); navigate('/login') }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <span>⇤</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold">AI Tools</h1>
                    <p className="text-gray-500 text-sm mt-1">Let AI break down your features into tasks</p>
                </div>

                {/* Input */}
                <div className="bg-[#161b27] border border-white/5 rounded-xl p-6 mb-6">
                    <label className="text-xs text-gray-400 uppercase tracking-widest mb-3 block">Feature Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="e.g. Build a user authentication system with login and register..."
                        rows={3}
                        className="w-full bg-[#0f1117] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all resize-none"
                    />
                    <button
                        onClick={handleExpand}
                        disabled={loading}
                        className="mt-4 bg-[#7c3aed] hover:bg-[#6d28d9] disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-all"
                    >
                        {loading ? 'Generating...' : '✦ Generate Subtasks'}
                    </button>
                </div>

                {/* Results */}
                {subtasks.length > 0 && (
                    <div className="bg-[#161b27] border border-white/5 rounded-xl p-6">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">Generated Subtasks</h2>
                        <div className="flex flex-col gap-3">
                            {subtasks.map((task, i) => (
                                <div key={i} className="flex items-center justify-between bg-[#0f1117] border border-white/5 rounded-lg px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <span className="text-purple-400 text-xs font-mono">{String(i + 1).padStart(2, '0')}</span>
                                        <p className="text-sm text-gray-300">{task}</p>
                                    </div>
                                    <button
                                        onClick={() => addToTasks(task, i)}
                                        disabled={addedTasks.includes(i)}
                                        className={`text-xs border px-3 py-1 rounded-lg transition-all ml-4 shrink-0 ${addedTasks.includes(i)
                                                ? 'text-green-400 border-green-500/30 cursor-not-allowed'
                                                : 'text-purple-400 hover:text-purple-300 border-purple-500/30 hover:border-purple-400/50'
                                            }`}
                                    >
                                        {addedTasks.includes(i) ? '✓ Added' : '+ Add to Tasks'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

