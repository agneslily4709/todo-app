import React from 'react';
import { Link } from 'react-router-dom';
import ErrorImg from "../Imgs/error.png"
import '../Styles/styles.css'

const Errorpage = () => {
  return (
    <div className="my-container">
        <img src={ErrorImg} className='error-img' alt='404 Page not found'/>
    <Link to="/signin"><button  className="mt-5 my-button">Home Page</button> </Link>
    </div>
  )
}
export default Errorpage