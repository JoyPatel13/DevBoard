import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Pomodoro() {

    const [timeLeft, setTimeLeft] = useState(25 * 60)
    const [isRunning, setIsRunning] = useState(false)
    const [isBreak, setIsBreak] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isRunning) return

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval)
                    setIsRunning(false)
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

    const accent = isBreak ? '#22c55e' : '#7c3aed'

    return (
        <div className="flex min-h-screen bg-[#0f1117] text-white">

            {/* Sidebar */}
           <Sidebar activePage="Pomodoro"/>
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
                </div>

                {/* Session info */}
                <p className="text-gray-600 text-xs mt-8">
                    {isBreak ? '5 minute break' : '25 minute focus session'}
                </p>
            </main>
        </div>
    )

}

