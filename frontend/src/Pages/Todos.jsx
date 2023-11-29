import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import { AiFillDelete,AiFillEdit } from "react-icons/ai";
import Cookies from 'js-cookie';

const Todos = ({todos,setTodos}) => {
        const token = Cookies.get("jwtoken")
        const navigate = useNavigate()
        const tableHeaders = ["S.No","Title","Description","Priority","Status","Actions"]
        const callAllTodos = async () => {
                try {
                  const response = await axios.get(`${SERVER_URL}/getTodos`, { withCredentials: true,headers: { Authorization: `Bearer ${token}`} });
                  if (response.status === 200) {
                        const data = response.data;
                        setTodos(data)
                  }
                } catch (error) {
                  const errorMessage = error.response ? error.response.data.message : "An error occurred";
                  toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                }
              }
            
              useEffect(() => {
                callAllTodos();
              }, []);

              const handleDelete = async(id) => {
                try {
                        const response = await axios.delete(`${SERVER_URL}/deleteTodo/${id}`, { withCredentials: true,headers: { Authorization: `Bearer ${token}`} });
                        setTodos((prevTodos)=>prevTodos.filter((ele)=>ele._id !== id))
                        if(response.status === 200) toast.success("Todo Deleted",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                      } catch (error) {
                        const errorMessage = error.response ? error.response.data.message : "An error occurred";
                        toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                      }
              }
  return (
        <>
        {todos.length>0  ? 
        <div className='table-responsive'>
                        <table className='table table-light container my-table'>
                <thead>
                        <tr>{tableHeaders.map((header,idx)=> ( <th scope='col' key={idx}>{header}</th>))}</tr>                        
                </thead>
                <tbody>
                       {todos && todos.map((todo,idx) => (
                                <tr key={idx}>
                                        <td>{idx+1}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.priority}</td>
                                        <td>{todo.status}</td>
                                        <td className='d-flex flex-row justify-content-center'>
                                                <button className='btn btn-warning mx-sm-auto mx-md-2' onClick={()=>navigate(`/editTodo/${todo._id}`)}><AiFillEdit className='action-icons'/></button>
                                                <button className='btn btn-danger mx-sm-auto mx-md-2' onClick={()=>handleDelete(todo._id)}><AiFillDelete className='action-icons'/></button>
                                        </td>
                                </tr> ))}
                </tbody>
        </table>
        </div>:
                <div className=''>
                        <h1>No todos found. You can start creating.</h1>
                </div>}
                <ToastContainer/>
        </>
  )
}

export default Todos