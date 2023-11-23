import React,{useCallback, useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/AuthContext.js';
import { SERVER_URL } from '../Utils/globals';

const Signout = () => {
        const {setUserState} = useContext(AuthContext)
        const navigate = useNavigate();

    const handleSignOut =useCallback( async() => {
        try{
        const response =await  axios.get(`${SERVER_URL}/signout`,{withCredentials:true});
        if(response.status === 200 ){
                toast.success("SignOut Successful",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000,})
                setUserState(false)
                navigate('/signin');
            }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
    },[navigate,setUserState])
    useEffect(()=>{
        handleSignOut()
},[handleSignOut])
  return (
    <>
    <h1>Signout</h1>
    <ToastContainer/>
    </>
  )
}

export default Signout;