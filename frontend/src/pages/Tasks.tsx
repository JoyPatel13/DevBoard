import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"
import toast from "react-hot-toast"

type Task = {
    id: string
    title: string
    status: string
    priority: string
}

export default function Tasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTitle, setNewTitle] = useState('')
    const [newPriority, setNewPriority] = useState('MEDIUM')
    const navigate = useNavigate()

    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        fetchTasks()
    }, [])

    async function fetchTasks() {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks/', {
                headers: { Authorization: `Bearer ${token}` }
            })
            setTasks(response.data.tasks)
        } catch (err) {
            console.log(err)
        }
    }

    async function createTask() {
        if (!newTitle.trim()) return
        try {
            await axios.post('http://localhost:5000/api/tasks/create',
                { title: newTitle, priority: newPriority },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            toast.success('Task created!')
            setNewTitle('')
            fetchTasks()
        } catch (err) {
            console.log(err)
        }
    }

    async function updateStatus(id: string, status: string) {
        try {
            await axios.put(`http://localhost:5000/api/tasks/update/${id}`,
                { status },
                { headers: { Authorization: `Bearer ${token}` } }
            )
            fetchTasks()
            toast.success('Task Updated!')
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong!")
        }
    }

    async function deleteTask(id: string) {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/delete/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
            toast.success('Task Deleted!')
            fetchTasks()
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong!")
        }
    }

    const columns = [
        { label: "Todo", status: "TODO", color: "text-blue-400", border: "border-blue-500/20" },
        { label: "In Progress", status: "IN_PROGRESS", color: "text-yellow-400", border: "border-yellow-500/20" },
        { label: "Done", status: "DONE", color: "text-green-400", border: "border-green-500/20" },
    ]

    const priorityColor: Record<string, string> = {
        LOW: "text-gray-400 bg-gray-500/10",
        MEDIUM: "text-yellow-400 bg-yellow-500/10",
        HIGH: "text-red-400 bg-red-500/10",
    }

    return (
        <div className="flex min-h-screen bg-[#0f1117] text-white">

            {/* Sidebar */}
            <Sidebar activePage="Tasks"/>

            {/* Main */}
            <main className="flex-1 p-8">
                <div className="mb-6">
                    <h1 className="text-2xl font-semibold">Tasks</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your work across columns</p>
                </div>

                {/* Add Task */}
                <div className="flex gap-3 mb-8">
                    <input
                        type="text"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && createTask()}
                        placeholder="Add a new task..."
                        className="flex-1 bg-[#161b27] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 transition-all"
                    />
                    <select
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        className="bg-[#161b27] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-gray-400 focus:outline-none"
                    >
                        <option value="LOW">Low</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="HIGH">High</option>
                    </select>
                    <button
                        onClick={createTask}
                        className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-sm px-5 py-2.5 rounded-lg transition-colors"
                    >
                        Add
                    </button>
                </div>

                {/* Kanban Columns */}
                <div className="grid grid-cols-3 gap-5">
                    {columns.map((col) => (
                        <div key={col.status} className={`bg-[#161b27] border ${col.border} rounded-xl p-4`}>
                            <div className={`text-xs font-semibold uppercase tracking-widest mb-4 ${col.color}`}>
                                {col.label} · {tasks.filter(t => t.status === col.status).length}
                            </div>
                            <div className="flex flex-col gap-3">
                                {tasks
                                    .filter(t => t.status === col.status)
                                    .map(task => (
                                        <div key={task.id} className="bg-[#0f1117] border border-white/5 rounded-lg p-3">
                                            <p className="text-sm text-white mb-2">{task.title}</p>
                                            <div className="flex items-center justify-between">
                                                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColor[task.priority]}`}>
                                                    {task.priority}
                                                </span>
                                                <div className="flex gap-1">
                                                    {col.status !== "TODO" && (
                                                        <button onClick={() => updateStatus(task.id, col.status === "IN_PROGRESS" ? "TODO" : "IN_PROGRESS")}
                                                            className="text-xs text-gray-500 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors">
                                                            ←
                                                        </button>
                                                    )}
                                                    {col.status !== "DONE" && (
                                                        <button onClick={() => updateStatus(task.id, col.status === "TODO" ? "IN_PROGRESS" : "DONE")}
                                                            className="text-xs text-gray-500 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors">
                                                            →
                                                        </button>
                                                    )}
                                                    <button onClick={() => deleteTask(task.id)}
                                                        className="text-xs text-gray-500 hover:text-red-400 px-2 py-1 rounded hover:bg-red-500/5 transition-colors">
                                                        ✕
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                {tasks.filter(t => t.status === col.status).length === 0 && (
                                    <p className="text-xs text-gray-600 text-center py-4">No tasks</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}