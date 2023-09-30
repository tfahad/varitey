import React, {useEffect, useState} from 'react'
import { card1,card2 } from '../Product/Kitchen/KitchenData';
import {ShopContext} from '../Context/ShopContext';
import { useContext } from 'react';
import {CartItems} from './CartItems'
import "./cart.css"
import {useNavigate} from 'react-router-dom'
import empty from './empty.png'
import Modal1 from './Modal1'


const Cart = () => {
  
  const combinedCards = card1.concat(card2);
  const navigate = useNavigate();
  const {cartItems , getTotalCartAmount, taxAmount, updateCartItemCount} = useContext(ShopContext)
  const totalAmount =getTotalCartAmount();
 const taxAmt = taxAmount();
 const total = taxAmt + totalAmount;
  const [textArray] = useState(['WELCOME10', 'WELCOME5']);
  const [coupon, setCoupon] = useState('default');
  const [Amnt, setSum] = useState();
  const formattedTax = taxAmt.toFixed(2);
  const formattedTotalAmount = totalAmount.toFixed(2);
  const formattedTotal = total.toFixed(2);
  // const formattedSavings = total.toFixed(2);
  const formattedAmnt = Amnt ? Amnt.toFixed(2) : '0.00';

  const[isOpen, setIsOpen] = useState(false);
  
  const [userData, setUserData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    pin: ''
  });
  
  const handleInputChange = (event) => {
    const userInput = event.target.value;
    // Check if the user input is available in the array
    if (textArray.includes(userInput)) {
      setCoupon(userInput);
    } else {
      setCoupon('default');
    }
  };



  
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleCheckout = () => {
    // Save the userData array in the localStorage
    localStorage.setItem('userDetails', JSON.stringify(userData));
    // Proceed with the checkout process
    // ...
  };






  const Discount = (coupon) => {
    switch (coupon) {
      case 'WELCOME10':
        return total - ((total*10)/100);
      case 'WELCOME5':
        return total - ((total*5)/100);
      default:
        return total;
    }
  };
  
  useEffect(() => {
    setSum(Discount(coupon,totalAmount));
  }, [coupon,totalAmount]);
  
  const handleItemCountChange = (newCount, id) => {
    updateCartItemCount(newCount, id);
  };
 




  


  return (
    <div className='cart'>
      {totalAmount > 0 ?
    <div className='maincart'>
      <div className='cartsub'>
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className='cartItems'>
        {combinedCards.map((item)=>{
          if(cartItems[item.id] !== 0){
            return <CartItems data={item} handleItemCountChange={handleItemCountChange}/>
          }else{
            return ""
          }
        
        })}
    </div>
    
       <div className="checkout">
        
        <p>Subtotal: ${totalAmount}</p>
        <button className='shop-btn' onClick={() => navigate("/")}>Continue shopping</button>
       </div>
      
    </div>
    <div className='coupon'>
      <div className='coupon_card'>
       <div className='details'>
            <div className='details-sub'>
              <label >Name</label>
              <input
                className='details-in'
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange2}
                placeholder='Enter your name here'
              />            </div>
            <div className='details-sub'>
              <label >Address</label>
              <input type="text" name='address' className='details-in' value={userData.address} onChange={handleInputChange2} />
            </div>
            <div className='details-sub'>
              <label >Pin-code</label>
              <input type="text" name='pin' className='details-in' value={userData.pin} onChange={handleInputChange2} />
            </div>
            <div className='details-sub'>
              <label >Mobile</label>
              <input  type="text" className='details-in' name='phoneNumber' value={userData.phoneNumber} onChange={handleInputChange2} />
            </div>
            
       </div>
       <div className='hrdiv'>
        <hr className='cart-hr' />
       </div>
       <span className='details-note'>*Apply if you any coupon code</span>

         <input className='coupon-in' type="text" onChange={handleInputChange} />
         
         <div className='coupon_cardsub'>
          <p className='coupon_txt'><span>Subtotal:</span> <p>{formattedTotalAmount}</p> </p>
          <p className='coupon_txt'> <span>Estimated Tax:</span><p>{formattedTax}</p></p>
          <p className='coupon_txt'> <span>Estimated Shipping:</span><p>Free</p></p>
          <p className='coupon_txt'> <span>Total:</span><p>{formattedAmnt}</p></p>
         </div>
         <button className='shop-btn' onClick={() => {
    if (userData.name === "" || userData.address === "" || userData.phoneNumber === "")  {
      setIsOpen(false); // Set isOpen to false if userData.name is empty
      alert("Please enter all required information");
    } else {
      handleCheckout();
      setIsOpen(true);
    }
  }}>Checkout</button>
         <Modal1 open={isOpen} onClose={()=>{setIsOpen(false)}}   formattedTotalAmount={formattedTotalAmount}
            formattedTotal={formattedTotal}
            formattedAmnt={formattedAmnt} taxAmt={taxAmt}
            />
            
            
      </div>
      

    </div>
    </div>
    : 
    <div className='emptycart'>
      <img src={empty} alt="" width="150px" height="150px" />
      <br />
      <h1>Your Cart is <span className='fb-span-blue-txt'>Empty</span></h1>  
      <br />
      <button className='shop-btn' onClick={() => navigate("/")}>Continue shopping</button>

  </div>
  }
    </div>
  )
}

export default Cart