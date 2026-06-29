import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${item.label === "Pomodoro" ? "text-white bg-white/8" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
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

