import React,{ useContext, useState } from 'react'
import { AuthContext } from '../Context/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import {BiSolidCopy} from "react-icons/bi"

const Home = () => {
        const navigate = useNavigate()
        const [copyEmail,setEmailCopy] = useState("")
        const [copyPass,setPassCopy] = useState("")
        const {userState} = useContext(AuthContext)
  return (
        <>
        <div className='my-container'>
                <div className='my-home'>
                {userState ? 
                <div className="container-fluid mt-5 d-flex flex-column flex-sm-row gap-3">
                        <div className="d-flex flex-column flex-grow-sm-0 flex-grow-1 gap-4">
                                home
                        </div>
                </div>
                :
                <>
                        <div>
                                        <h1 className='welcome-text'>Unlock Your Potential: Start, Check, Complete</h1>
                                        <div className='align-items-center gap-3 mt-5'>
                                                <div className='text-center'>
                                                <h1>The Todo App</h1>
                                                <p>You can either SignUp or SignIn</p>
                                                <button type="button" className="btn btn-secondary me-2" onClick={()=>navigate("/signup")}>SignUp</button>
                                                <button type="button" className="btn btn-secondary ms-2" onClick={()=>navigate("/signin")}>SignIn</button>
                                                </div>
                                        </div>
                                        <div className='mt-5 d-flex flex-column align-items-center'>
                                                <h4>If you're a reviewer of my project, here is the credentials</h4>
                                        </div>
                        </div>
                </>}
                </div>
        </div>
        </>
  )
}

export default Home