import { useEffect , useState  } from "react";
import { useNavigate } from "react-router-dom";

const [timeLeft, setTimeLeft] = useState(25*60)
const [isRunning, setIsRunning] = useState(false)
const [isBreak, setIsBreak] = useState(false)
const navigate = useNavigate()

useEffect(()=>{
    if(!isRunning) return 

    const interval = setInterval(()=>{
        setTimeLeft(prev =>{
            if(prev <=1){
                clearInterval(interval)
                setIsRunning(false)
                setIsBreak(b=>!b)
                return isBreak ? 25*60 : 5*60
            }
            return prev-1;
        })
    } , 1000)
    return ()=> clearInterval(interval)


} , [isRunning , isBreak])

function formatTime(seconds:number){
    const m = Math.floor(seconds/60).toString().padStart(2,'0')
    const s = (seconds%60).toString().padStart(2,'0')
    return `${m}:${s}`
}

