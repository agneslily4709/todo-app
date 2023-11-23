import React,{useEffect,useCallback} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SERVER_URL } from '../Utils/globals';
import { AiFillDelete,AiFillEdit } from "react-icons/ai";

const Todos = ({todos,setTodos}) => {
        const navigate = useNavigate()
        const tableHeaders = ["S.No","Title","Description","Priority","Status","Actions"]
        const callAllTodos = async () => {
                try {
                  const response = await axios.get(`${SERVER_URL}/getTodos`, { withCredentials: true });
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
                        const response = await axios.delete(`${SERVER_URL}/deleteTodo/${id}`, { withCredentials: true });
                        setTodos((prevTodos)=>prevTodos.filter((ele)=>ele._id !== id))
                        if(response.status === 200) toast.success("Todo Deleted",{ position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000})
                      } catch (error) {
                        const errorMessage = error.response ? error.response.data.message : "An error occurred";
                        toast.error(errorMessage, { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
                      }
              }
  return (
        <>
        <table className='table table-light container'>
                <thead>
                        <tr>
                                {tableHeaders.map((header,idx)=> (
                                        <th scope='col' key={idx}>{header}</th>
                                ))}
                        </tr>                        
                </thead>
                <tbody>
                        {todos.length>0?
                        todos.map((todo,idx) => (
                                <tr key={idx}>
                                        <td>{idx+1}</td>
                                        <td>{todo.title}</td>
                                        <td>{todo.description}</td>
                                        <td>{todo.priority}</td>
                                        <td>{todo.status}</td>
                                        <td>
                                                <button className='btn btn-warning mx-2' onClick={()=>navigate(`/editTodo/${todo._id}`)}><AiFillEdit/></button>
                                                <button className='btn btn-danger mx-2' onClick={()=>handleDelete(todo._id)}><AiFillDelete/></button>
                                        </td>
                                </tr>
                        ))
                        :
                        <p>No todos found</p>}
                </tbody>
        </table>
                <ToastContainer/>
        </>
  )
}

export default Todos