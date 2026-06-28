import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

type Task = {
    id: string
    title: string
    status: string
    priority: string
    createdAt:string
}
export default function Dashboard() {
    const navigate = useNavigate()

    const [tasks, setTasks] = useState<Task[]>([])
    const token = localStorage.getItem('accessToken')

    useEffect(()=>{
        async function fetchTasks(){
            try{
                const response = await axios.get('http://localhost:5000/api/tasks/' , {
                    headers : {Authorization : `Bearer ${token}`}
                })
                setTasks(response.data.tasks)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchTasks()
    } , [])


    function handleLogout() {
        localStorage.removeItem('accessToken')
        navigate('/login')
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
                    { label: "Dashboard", icon: "⊞"  , path: '/dashboard'},
                    { label: "Tasks", icon: "✓" , path:'/tasks'},
                    { label: "Pomodoro", icon: "◷" , path: '/pomodoro'},
                    { label: "AI Tools", icon: "✦" , path:'/ai' },
                ].map((item) => (
                    <button
                        key={item.label}
                        onClick={()=>navigate(item.path)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left"
                    >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                    </button>
                ))}

                <div className="mt-auto">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <span>⇤</span>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white">Good morning 👋</h1>
                    <p className="text-gray-500 text-sm mt-1">Here's what's on your plate today.</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "Tasks Today", value: `${tasks.filter(t => new Date(t.createdAt ).toDateString() === new Date().toDateString()).length}`, color: "text-purple-400" },
                        { label: "Focus Sessions", value: "0", color: "text-blue-400" },
                        { label: "Completed", value: `${ tasks.filter(t => t.status === 'DONE').length}`, color: "text-green-400" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-[#161b27] border border-white/5 rounded-xl p-5">
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">{stat.label}</p>
                            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                <div className="bg-[#161b27] border border-white/5 rounded-xl p-10 text-center">
                    <p className="text-gray-600 text-sm">No tasks yet — add one to get started.</p>
                </div>
            </main>
        </div>
    )
}