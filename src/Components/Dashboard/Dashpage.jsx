import React, {useState, useContext} from 'react'
import { Link,Outlet } from 'react-router-dom';
import logo from '../Cart/logo.png'
import {ShopContext} from '../Context/ShopContext'
import "./login.css"
import adminlogo from './images/wrench.png';
import ttlBook from './images/booking.png'
import dollar from './images/dollar-symbol.png'
import pending from './images/pending.png'
import completed from './images/completed.png'
import BookedServices from './BookedServices';


const retrievedOrders = localStorage.getItem('bookedServices');
const orders = JSON.parse(retrievedOrders) || [];



const Dashpage = () => {

 
  const { orderDetails } = useContext(ShopContext);
  const [printModalOpen, setPrintModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('All'); 

  const handlePrintModalToggle = () => {
    setPrintModalOpen(!printModalOpen);
  };

  const length = orders.length
  const filteredOrders = selectedOption === 'All' ? orders : (selectedOption === 'Pending' ? orders.filter((item) => item.status === 'Pending') : orders.filter((item) => item.status === 'Done'));

  const pendingCount = orders.filter((item) => item.status === 'Pending').length;
  const completedCount = orders.filter((item) => item.status === 'Done').length;

  const totalAmountSum = orders.reduce((sum, item) => {
    return sum + parseFloat(item.totalAmount);
  }, 0);



  return (
    <div className='lnav_main'>
        <div className='navbar'>
          
           <div className='lmenu'>
           <Link to='/'> <img src={logo} alt="" width="150px" className='llogo'/> </Link>
             {/* <Link to='/' className='link'><span className='menu-span'>Home</span></Link>
             <Link to='/Kitchen' className='link'><span className='menu-span'>Kitchen</span></Link> */}
             {/* <Link to='/login' className='link'><span className='menu-span'>Login</span></Link> */}
             {/* <Link to='/faq' className='link'><span className='menu-span'>FAQ</span></Link> */}
           </div>
          
        </div>
        <div className='box'>


              <div className='left-side-bar'>
                <div className='left-card'>
                  <div className="left-card-sub">
                  <img src={adminlogo} alt="" width='80px' className='adminlogo'/>
                  <h1 className='dash-txt'>Admin</h1>
                  <button  onClick={() => setSelectedOption('All')} className={`left-menu ${selectedOption === 'All' ? 'selected' : ''}`}>Dashboard</button>
                  <button  onClick={() => setSelectedOption('Pending')} className={`left-menu ${selectedOption === 'Pending' ? 'selected' : ''}`}>Pending Order</button>
                  <button  onClick={() => setSelectedOption('Done')} className={`left-menu ${selectedOption === 'Done' ? 'selected' : ''}`}>Completed Orders</button>
                  <Link to="/"  className="menu-link"><button className='left-menul'> Logout</button></Link>
                  </div>
                </div>
              </div>


              <div className='middle-cards'>
            
                 <BookedServices orders={filteredOrders} />
          
              </div>


              <div className='right-side-bar'>
                <div className='right-cards'>
                  <div className='right-card-sub'>
                  <div className="right-card">
                    <div className="right-card-txt">
                      <span className='card-txt'>Total Orders</span>
                      <span  className='card-txt'>{length}</span>
                    </div>
                    <div className="right-card-img">
                      <img src={ttlBook} alt="" />
                    </div>
                  </div>
                  <div className="right-card">
                    <div className="right-card-txt">
                      <span  className='card-txt'>Pending Orders</span>
                      <span  className='card-txt'>{pendingCount}</span>
                    </div>
                    <div className="right-card-img">
                      <img src={pending} alt="" />
                    </div>
                  </div>
                  <div className="right-card">
                    <div className="right-card-txt">
                      <span  className='card-txt'>Delivered Orders</span>
                      <span  className='card-txt'>{completedCount}</span>
                    </div>
                    <div className="right-card-img">
                      <img src={completed} alt="" />
                    </div>
                  </div>
                  <div className="right-card">
                    <div className="right-card-txt">
                      <span  className='card-txt'>Total Returns</span>
                      <span  className='card-txt'>{totalAmountSum.toFixed(2)}</span>
                    </div>
                    <div className="right-card-img">
                      <img src={dollar} alt="" />
                    </div>
                  </div>
                  </div>
                </div>
              </div>
        </div>
     
    </div>
  )
}

export default Dashpage