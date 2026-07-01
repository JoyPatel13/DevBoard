import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";

export default function Pomodoro() {

    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [standup, setStandup] = useState('')
    const [loadingStandup, setLoadingStandup] = useState(false)

    useEffect(() => {
        if (!isRunning) return

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setIsRunning(false)
                    if (!isBreak) {
                        const token = localStorage.getItem('accessToken')
                        axios.post('http://localhost:5000/api/pomodoro/create', {
                            duration: 25 * 60,
                            taskTitle
                        }, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                    }
                    setIsBreak(b => !b)
                    return isBreak ? 25 * 60 : 5 * 60
                }
                return prev - 1;
            })
        }, 1000)
        return () => clearInterval(interval)


    }, [isRunning, isBreak])

    function formatTime(seconds: number) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0')
        const s = (seconds % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    async function handleGenerateStandup() {

        try {
            setLoadingStandup(true)
            const token = localStorage.getItem('accessToken')
            const response = await axios.post('http://localhost:5000/api/ai/standup', {}, {
                headers: { Authorization: `Bearer ${token}` }
            })

            setStandup(response.data.standup)

        } catch (err) {
            console.log(err)

        }
        finally {
            setLoadingStandup(false)
        }
    }
    const accent = isBreak ? '#22c55e' : '#7c3aed'

    return (
        <div className="flex min-h-screen bg-[#0f1117] text-white">

            {/* Sidebar */}
            <Sidebar activePage="Pomodoro" />
            {/* Main */}
            <main className="flex-1 flex flex-col items-center justify-center p-8">

                {/* Mode badge */}
                <div className="mb-8 text-center">
                    <span
                        className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border"
                        style={{ color: accent, borderColor: accent + '40', background: accent + '15' }}
                    >
                        {isBreak ? '☕ Break Time' : '🎯 Focus Session'}
                    </span>
                </div>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    disabled={isRunning}
                    placeholder="What are you working on?"
                    className="w-72 bg-[#161b27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all mb-6 text-center"
                />

                {/* Timer circle */}
                <div
                    className="w-64 h-64 rounded-full flex items-center justify-center mb-10 border-4"
                    style={{ borderColor: accent + '40', boxShadow: `0 0 60px ${accent}20` }}
                >
                    <span className="text-6xl font-bold tabular-nums tracking-tight">
                        {formatTime(timeLeft)}
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={() => setIsRunning(r => !r)}
                        className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{ background: accent }}
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button
                        onClick={() => { setIsRunning(false); setTimeLeft(25 * 60); setIsBreak(false) }}
                        className="px-8 py-3 rounded-xl text-sm font-semibold text-gray-400 bg-white/5 hover:bg-white/10 transition-all"
                    >
                        Reset
                    </button>
                    <button disabled={loadingStandup}
                        className="px-8 py-3 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all"
                        onClick={handleGenerateStandup}>{loadingStandup ? "Generating Standup" : 'Generate Standup'}</button>
                </div>

                {/* Session info */}
                <p className="text-gray-600 text-xs mt-8">
                    {isBreak ? '5 minute break' : '25 minute focus session'}
                </p>
                {standup && (
                    <div className="mt-8 w-full max-w-md bg-[#161b27] border border-white/5 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-xs text-gray-400 uppercase tracking-widest">Standup Update</h2>
                            <button
                                onClick={() => navigator.clipboard.writeText(standup)}
                                className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed">{standup}</p>
                    </div>
                )}
            </main>
        </div>
    )

}

