import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "../components/Sidebar"

type Task = {
    id: string
    title: string
    status: string
    priority: string
    createdAt: string
}
export default function Dashboard() {
    const navigate = useNavigate()
    const [tasks, setTasks] = useState<Task[]>([])
    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks/', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                setTasks(response.data.tasks)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchTasks()
    }, [])


    function handleLogout() {
        localStorage.removeItem('accessToken')
        navigate('/login')
    }

    return (
        <div className="flex min-h-screen bg-[#0f1117] text-white">

            {/* Sidebar */}
            <Sidebar activePage="DashBoard"/>
            {/* Main Content */}
            <main className="flex-1 p-8">
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white">Good morning 👋</h1>
                    <p className="text-gray-500 text-sm mt-1">Here's what's on your plate today.</p>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                    {[
                        { label: "Tasks Today", value: `${tasks.filter(t => new Date(t.createdAt).toDateString() === new Date().toDateString()).length}`, color: "text-purple-400" },
                        { label: "Focus Sessions", value: "0", color: "text-blue-400" },
                        { label: "Completed", value: `${tasks.filter(t => t.status === 'DONE').length}`, color: "text-green-400" },
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