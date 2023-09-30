import React from 'react'
// import { Link } from 'react-router-dom';
import {ShopContext} from '../../Context/ShopContext';
import { useContext } from 'react';


const KitchenPopup = ({trigger,setTrigger,product}) => {
 
  const {addToCart} = useContext(ShopContext)

  // const cartItemAmount = cartItems()




    return (trigger)?(
        <div className='k-popup'>
        {/* {card1.map((item)=>{
           return(  */}
           <div className='k-head'>
            <div className='k-popup-img'>
          <img src={product.img2} alt="" className='kpopup-img' />
          <img src={product.img3} alt="" className='kpopup-img' />
          <img src={product.img4} alt="" className='kpopup-img' />
          <img src={product.img5} alt="" className='kpopup-img' />
        </div>
        <span className='ktitle'>{product.span_head}</span>
        <span className='k-head-span'>{product.desc}</span>
        <span className='k-head-span'>Price : ${product.span_body}/Each</span>
        
        <div className="pdt_overview">
            <span className='overview_span'><img src={product.img6} alt="" overview_img/>{product.o1}</span>
            <span className='overview_span'><img src={product.img6} alt="" overview_img/>{product.o2}</span>
            <span className='overview_span'><img src={product.img6} alt="" overview_img/>{product.o3}</span>
            <span className='overview_span'><img src={product.img6} alt="" overview_img/>{product.o4}</span>
            <span className='overview_span'><img src={product.img6} alt="" overview_img/>{product.o5}</span>
        </div>


        <span className='k-body-span'>{product.quote}</span>
        </div>
     {/* )})}  */}
        <div className='kbtns'>
          <button  className="popup-btn" onClick={()=>setTrigger(false)}>close</button>
           

          <button   className="popup-btn"  onClick={() => addToCart(product.id)}>
              Add to cart
            </button>
            
       
        </div>
      </div>
      ) : "";
}

export default KitchenPopup