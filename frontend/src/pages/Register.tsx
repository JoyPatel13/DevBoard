import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            await axios.post('http://localhost:5000/api/auth/register', { name, email, password })
            
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password })
            localStorage.setItem('accessToken', response.data.accessToken)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div>
                <label htmlFor="name">Enter Name</label>
                <input type="text" name="name" value={name} id="name" onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">Enter Email</label>
                <input type="email" name="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="password">Enter Password</label>
                <input type="password" value={password} name="password" id="password" onChange={(e) => setPassword(e.target.value)} />

                <button onClick={handleSubmit}>Register</button>
            </div>
        </>
    )
}