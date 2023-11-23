import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext.js';
import { MdTaskAlt } from "react-icons/md";

const Navbar = () => {
        const {userState} = useContext(AuthContext)
    return (
        <>
                <nav className="navbar navbar-expand-lg py-3 my-navbar fixed-top">
                        <div className="container">
                                <a className="navbar-brand my-navbar-item" href="/"><MdTaskAlt size={30}/>  Todo App</a>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon" style={{color:"white"}}>↓↓↓</span> </button>
                                <div className="collapse navbar-collapse" id="navbarScroll">
                                <ul className="navbar-nav ms-auto">
                                {userState ? 
                                        <>
                                        <li className="nav-item"><Link className="nav-link my-navbar-item" to="/" >Todos</Link></li>
                                        <li className="nav-item"><Link className="nav-link my-navbar-item" to="/profile" >Profile</Link></li>
                                        <li className="nav-item"><Link className="nav-link my-navbar-item" to="/signout" >SignOut</Link></li>
                                        </> 
                                         : 
                                        <>
                                        <li className="nav-item"><Link className="nav-link my-navbar-item" to="/signup" >SignUp</Link></li>
                                         <li className="nav-item"><Link className="nav-link my-navbar-item" to="/signin" >SignIn</Link></li>
                                        </>
                                } 
                                </ul>
                        </div>
                        </div>
                </nav>          
        </>
    )
}
export default Navbar