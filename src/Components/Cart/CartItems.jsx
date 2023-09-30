import React,{useContext} from 'react'
import { ShopContext } from '../Context/ShopContext'



export const CartItems = (props) => {
    const {id, img2, span_head, span_body} = props.data;
    const {cartItems, increaseCartItem, removeFromCart, updateCartItemCount, closeFromCart} = useContext(ShopContext)
   
    const handleItemCountChange = (e) => {
      const newCount = Number(e.target.value);
      updateCartItemCount(newCount, id);
    };


  return (
    <div className='cartItemssub'>
        <img src={img2} alt="" className='cartItem-img' />
        <div className='cartdesc'>
            <p> <b  className='kcard-head-span'>{span_head}</b> </p>
            <p className='kcard-body-span'> ${span_body}</p>
            <div className="countHandler">
                <button className='handler-btn' onClick={()=>removeFromCart(id)}> - </button>
                <input className='handler-in' value={cartItems[id]} type='text' onChange={handleItemCountChange} />
                <button  className='handler-btn'  onClick={()=>increaseCartItem(id)}> + </button>
            </div>
            <button className='handler-btn2' onClick={()=>closeFromCart(id)}>Remove</button>
        </div>
    </div>
  )
}
