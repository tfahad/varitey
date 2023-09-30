import React, {useState, useContext, useEffect} from 'react'
import { Link,Outlet } from 'react-router-dom';
import logo from './logo.png'
import cart from './cart.png'
import search from './search.png'
import Modal from './Modal';
import {ShopContext} from '../Context/ShopContext'
import Login from '../Dashboard/Login';



const Layout = () => {

  const {getCartLength} = useContext(ShopContext);
  const len= getCartLength();

   
  const[isOpen, setIsOpen] = useState(false);
  const[lisOpen, lsetIsOpen] = useState(false);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);



  return (
    <div className='nav_main'>
        <div className='navbar'>
        <Link to='/'> <img src={logo} alt="" width="150px" className='logo'/> </Link>

           <div className='menu'>
             <Link to='/' className='link-ex'><span className='menu-span'>Home</span></Link>
             <Link to='/Kitchen' className='link'><span className='menu-span'>Kitchen</span></Link>
             <Link  className='link-ex' onClick={()=>lsetIsOpen(true)}><span  className='menu-span'>Admin</span></Link>
             <Login open={lisOpen} onClose={()=>lsetIsOpen(false)}/>
             {/* <Link to='/faq' className='link'><span className='menu-span'>FAQ</span></Link> */}
           </div>
           <div className='right-menu'>
           <button className='r-m-btn' onClick={()=>setIsOpen(true)}>
            <img src={search} alt="" width='10%'/>
            <span>Search...</span>
            <div className='sub-btn'>
                Ctrl +  M
            </div>
           </button>
           <Modal open={isOpen} onClose={()=>setIsOpen(false)}>
            
           </Modal>
           <div className='cartdiv'><Link to='/Cart' className='divert' ><p className='cartlen'>{len}</p><img src={cart} alt="" className='cartlogo' /></Link></div>
        </div>
        </div>
        <Outlet/>
    </div>
  )
}

export default Layout