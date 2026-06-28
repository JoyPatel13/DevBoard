import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Task = {
    id:string ,
    title : string,
    status : string,
    priority : string
}

export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newPriority, setNewPriority] = useState('MEDIUM')
    const navigate = useNavigate()

    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        fetchTasks()
    }, [])
    async function fetchTasks() {
        try {

            const token = localStorage.getItem('accessToken')
            const response = await axios.get('http://localhost:5000/api/tasks/', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTasks(response.data.tasks)
            console.log(tasks)
        } catch (err) {
            console.log(err)
        }
    }

    async function createTask(){
        if(!newTitle.trim()) return
        try{
            await axios.post('http://localhost:5000/api/tasks/create' , {
                title: newTitle , priority : newPriority
            } , {
                headers : {Authorization : `Bearer ${token}`}
            })
        }
    }

    return (
        <div>
            <h1>Tasks</h1>
        </div>
    )
}

