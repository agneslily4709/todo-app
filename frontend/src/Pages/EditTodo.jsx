import React,  {useEffect, useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios"
import Cookies from 'js-cookie';

const EditTodo = () => {
        const params = useParams()
        const navigate = useNavigate()
        const token = Cookies.get("jwtoken")
        const [editTodo, setEditTodo] = useState({})
        const handleInputs = (e) =>{
            setEditTodo({...editTodo,[e.target.name]:e.target.value});
      }
      const EditTodo = async (e) =>{
        e.preventDefault();
        try {
                const response = await axios.put(`${SERVER_URL}/editTodo/${params.id}`, editTodo,{withCredentials:true,headers: { Authorization: `Bearer ${token}`}})
                if(response.status === 200 ){
                        toast.success("Todo Edited",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        setTimeout(()=>navigate("/"),2000)
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      }
      const callTodo = async() => {
        try {
                const response = await axios.get(`${SERVER_URL}/getTodo/${params.id}`,{withCredentials:true,headers: { Authorization: `Bearer ${token}`}})
                if(response.status === 200) setEditTodo(response.data)
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      }
      useEffect(()=>{
        callTodo()
      },[])
  return (
        <>
                <div className='my-container'>
                <form method='POST' className='form-component'>
                <h3 className='form-title'>Edit Todo Form</h3>
                        <input className='form-control' placeholder="Enter Title"  type="text"   name="title" onChange={handleInputs} value={editTodo.title}/> 
                        <input className='form-control' placeholder="Enter Description" type="text" name="description" onChange={handleInputs} value={editTodo.description}/>
                        <div className='row'>
                                <select className='form-select col mx-3' name='priority' onChange={handleInputs} value={editTodo.priority}>
                                <option value="none"  hidden>Select todo Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                                </select>
                                <select className='form-select col mx-3' name='status' onChange={handleInputs} value={editTodo.status }>
                                <option value="none"  hidden>Select todo Status</option>
                                <option value="Todo">Todo</option>
                                <option value="InProgress">InProgress</option>
                                <option value="Done">Done</option>
                                </select>
                        </div>                
                        <button className='my-button' onClick={EditTodo}>Edit Todo</button>
                </form>
                </div>
                <ToastContainer/>
        </>
  )
}

export default EditTodo