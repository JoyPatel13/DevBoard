import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import ProtectedRoute from './components/ProtectedRoute'
import Pomodoro from './pages/Pomodoro'
import AITools from './pages/AITools'
import CodeReview from './pages/CodeReview'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/dashboard" element={<ProtectedRoute>  <Dashboard/> </ProtectedRoute>} />
        <Route path='/tasks' element ={<ProtectedRoute><Tasks/></ProtectedRoute> } />
        <Route path='/ai' element ={<ProtectedRoute><AITools/></ProtectedRoute> } />
        <Route path='/pomodoro' element = {<ProtectedRoute><Pomodoro></Pomodoro></ProtectedRoute>} />
        <Route path="/code-review" element={<ProtectedRoute><CodeReview /></ProtectedRoute>} />
      </Routes> 
    </BrowserRouter>
  )
}

export default App