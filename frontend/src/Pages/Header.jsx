import React from 'react'
import { useNavigate } from 'react-router-dom'
import Todos from './Todos.jsx'

const Header = () => {
        const [todos,setTodos] = useState([])
        const navigate = useNavigate()
  return (
    <>
        <div className='mt-5'>
        <button onClick={() => navigate("/createTodo")}>Create</button>
        <Todos todos={todos} setTodos={setTodos}/>
        </div>
    </>
  )
}

export default Header