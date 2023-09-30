import React, { useState } from 'react';
import ReactDom from 'react-dom';
import { Link, Outlet } from 'react-router-dom';
import './login.css';
import { udetails } from '../../App';

const Modal = ({ onClose, open }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('@MAINadmin123');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  

  const handleLogin = () => {
    if (username === udetails[0] && password === udetails[1]) {

      window.location.href = '/Dashpage';
    } 
    if(username !== udetails[0]){
        setErrorMessage("*Incorrect Username")
    }else{
        setErrorMessage("")
    }
    if(password !== udetails[1]){
        setErrorMessage2("*Incorrect Password")
    }else{
        setErrorMessage2("")
    }
  }
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className='overlay' />
      <div className='lmodal'>
        <div className='lmodal_top'>
          <p>LOGIN</p>
          <button onClick={onClose} className='close'>
            X
          </button>
        </div>
        <div className='userdiv'>
        <input type="text" name='address' placeholder='Enter Username' className='details-in' value={username} onChange={(e) => setUsername(e.target.value)}  />
        <p className='error-message'>{errorMessage}</p>
        <input type="password" name='address' placeholder='Password' className='details-in' value={password} onChange={(e) => setPassword(e.target.value)}  />
        <p className='error-message'>{errorMessage2}</p>
        <button onClick={handleLogin} className='login-btn'>Login</button>
        </div>
      
       
      
      </div>
    </>,
    document.getElementById('portal')
  );
};

export default Modal;
