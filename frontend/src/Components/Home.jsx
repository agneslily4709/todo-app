import React,{ useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import {BiSolidCopy} from "react-icons/bi"
import InputTodo from "../Pages/InputTodo.jsx"
import Todos from '../Pages/Todos.jsx'
const Home = () => {
        const navigate = useNavigate()
        const [copyEmail,setEmailCopy] = useState("")
        const [copyPass,setPassCopy] = useState("")
        const {userState} = useContext(AuthContext)
        const [todos,setTodos] = useState([])
  return (
        <>
                <div className='my-home'>
                {userState ? 
                <div>
                       <button className='btn btn-success' onClick={() => navigate("/createTodo")}>Create Todo</button>
                        <Todos todos={todos} setTodos={setTodos}/>
                </div>
                        :<div className='my-container p-4 rounded-3 shadow'>
                                <h1 className='welcome-text'>Unlock Your Potential: Start, Check, Complete</h1>
                                <h1>The Todo App</h1>
                                <p>You can either SignUp or SignIn</p>
                                <div className='d-flex flex-row'>
                                <button type="button" className="btn btn-primary me-2" onClick={()=>navigate("/signup")}>SignUp</button>
                                <button type="button" className="btn btn-success ms-2" onClick={()=>navigate("/signin")}>SignIn</button>
                                </div>
                                <h4>If you're a reviewer of my project, here is the credentials</h4>
                        </div>}
                </div>
        </>
  )}

export default Home