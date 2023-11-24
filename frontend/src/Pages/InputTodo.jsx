import React,  {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const InputTodo = () => {
        const navigate = useNavigate()
        const [newTodo, setNewTodo] = useState({title:"",description:"",priority:"",status:""})
        
        const handleInputs = (e) =>{
            setNewTodo({...newTodo,[e.target.name]:e.target.value});
      }
      
      const dataValidation = () => {
        for (let property in newTodo) {
          const value = newTodo[property];
            if (value.trim() === "") {
              toast.error(`${property} is required`, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
              return false;
            }
        }
        return true;
      };
      
      const PostTodo = async (e) =>{
        e.preventDefault();
        if(!dataValidation())return
        try {
                const response = await axios.post(`${SERVER_URL}/createTodo`, newTodo,{withCredentials:true})
                if(response.status === 200 ){
                        toast.success("Todo Posted",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                        setTimeout(()=>navigate("/"),2000)
                }
        } catch (error) {
                const errorMessage = error.response ? error.response.data.message : "An error occurred";
                toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 })
        }
      }
  return (
        <>
                <div className='my-container'>
                <form method='POST' className='form-component'>
                <h3 className='form-title'>Add Todo Form</h3>
                        <input className='form-control' placeholder="Enter Title"  type="text"   name="title" onChange={handleInputs} value={newTodo.title}/> 
                        <input className='form-control' placeholder="Enter Description" type="text" name="description" onChange={handleInputs} value={newTodo.description}/>
                        <div className='row'>
                                <select className='form-select col mx-3' name='priority' onChange={handleInputs} value={newTodo.priority || ""}>
                                <option value="none"  hidden>Select todo Priority</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                                </select>
                                <select className='form-select col mx-3' name='status' onChange={handleInputs} value={newTodo.status || ""}>
                                <option value="none"  hidden>Select todo Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                                </select>
                        </div>                
                        <button className='my-button' onClick={PostTodo}>Add Todo</button>
                </form>
                </div>
                <ToastContainer/>
        </>
  )
}

export default InputTodo