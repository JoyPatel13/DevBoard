import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    async function handleSubmit() {
        try {
            
            setLoading(true)
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
            localStorage.setItem('accessToken', response.data.accessToken)
            window.location.href = '/dashboard'
            toast.success("User logged in successfully")
        } catch (err) {
            toast.error("Invalid email or password!")
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0d14] flex items-center justify-center relative overflow-hidden">
            
            {/* Background glow */}
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-700/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm px-4">
                {/* Logo */}
                <div className="text-center mb-8">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        DevBoard
                    </span>
                    <p className="text-gray-500 text-sm mt-1">Your developer productivity hub</p>
                </div>

                {/* Card */}
                <div className="bg-[#111827] border border-white/8 rounded-2xl p-7 shadow-xl">
                    <h2 className="text-white font-semibold text-lg mb-6">Sign in</h2>

                    <div className="flex flex-col gap-5">
                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 mb-1.5 block">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#0a0d14] border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/60 focus:ring-1 focus:ring-purple-500/20 transition-all"
                            />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-[#7c3aed] hover:bg-[#6d28d9 text-white text-sm font-medium py-2.5 rounded-lg transition-all mt-1 shadow-lg shadow-purple-900/30"
                        >
                            {loading ? 'Signing in...'   : ' Sign in'}
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-600 mt-6">
                        Don't have an account?{" "}
                        <a href="/register" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Create one
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}