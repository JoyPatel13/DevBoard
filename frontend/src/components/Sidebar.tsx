
import { useNavigate } from "react-router-dom"

interface SidebarProps {
    activePage: string
}
export default function Sidebar({ activePage }: SidebarProps) {
    const navigate = useNavigate()
    return (

        <aside className="w-64 bg-[#161b27] border-r border-white/5 flex flex-col px-4 py-6 gap-1">
            <div className="mb-8 px-3">
                <span className="text-purple-400 font-bold text-xl tracking-tight">DevBoard</span>
                <p className="text-xs text-gray-500 mt-1">Productivity Hub</p>
            </div>
            {[
                { label: "Dashboard", path: "/dashboard", icon: "⊞" },
                { label: "Tasks", path: "/tasks", icon: "✓" },
                { label: "Pomodoro", path: "/pomodoro", icon: "◷" },
                { label: "AI Tools", path: "/ai", icon: "✦" },
            ].map((item) => (
                <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors text-left ${item.label === activePage ? "text-white bg-white/8" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
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

    )


}