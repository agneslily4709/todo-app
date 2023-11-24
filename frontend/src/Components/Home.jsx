import React,{ useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import {BiSolidCopy} from "react-icons/bi"
import Todos from '../Pages/Todos.jsx'
import { MdTaskAlt } from "react-icons/md";

const Home = () => {
        const navigate = useNavigate()
        const {userState} = useContext(AuthContext)
        const [todos,setTodos] = useState([])
  return (
        <>
                {userState ? 
                <div className='my-home p-3'>
                        <div className=''>
                                <button className='btn btn-success' onClick={() => navigate("/createTodo")}>Create Todo</button>
                        </div>
                        <Todos todos={todos} setTodos={setTodos}/>
                </div>:
                <div className='my-container'>
                        <div className='bg-light p-4 rounded-3 shadow d-flex flex-column align-items-center'>
                        <h2 className='welcome-text mb-3'>Unlock Your Potential: Start, Check, Complete</h2>
                        <h1><MdTaskAlt/>  The Todo App  <MdTaskAlt/></h1>
                        <div className='d-flex flex-row mb-3'>
                                <button className="btn btn-primary mx-2" onClick={()=>navigate("/signup")}>SignUp</button>
                                <button className="btn btn-success mx-2" onClick={()=>navigate("/signin")}>SignIn</button>
                        </div>
                        <h6>If you're a reviewer of my project, here is the credentials</h6>
                        <div className='d-flex flex-row'>
                                <button className='btn btn-secondary mx-2' onClick={()=>navigator.clipboard.writeText("agneslily2772@gmail.com")}>Email <BiSolidCopy/></button>
                                <button className='btn btn-secondary mx-2' onClick={()=>navigator.clipboard.writeText("12345678")}>Password <BiSolidCopy/></button>
                        </div>
                        </div> 
                </div>}
        </>
  )}

export default Home