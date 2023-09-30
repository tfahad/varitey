import React,{useState} from 'react'
import Popup from './KitchenPopup';
// import { Link } from 'react-router-dom';
// import glass_a from './KitchenGallery/glass-a.jpg';
// import glass_b from './KitchenGallery/glass-b.jpg';
// import glass_c from './KitchenGallery/glass-c.jpg';
// import glass_d from './KitchenGallery/glass-d.jpg';
import { card1,card2 } from './KitchenData';







const KCardBody = () => {

  
    
    const [buttonPopup, setbuttonPopup] =useState(false);
    const [product, setproduct] = useState();
   
   

  const onclickAbout = (item) => {
    setbuttonPopup(true);
    setproduct(item);
  };
    
    
  return (
    <div className='kcardbody'>
        <div className='kmain_card'>
        <div className='Kmain_card-sub'>
          {card1.map((item)=>{
            return(
            <div className='kcards'>
            <img src={item.img} alt="" className='kcard-img'  />
            <span className='kcard-head-span'> {item.span_head}</span>
            <span className='kcard-body-span'>${item.span_body}/Each</span>
            <button className='read_more' onClick={()=>onclickAbout(item)}>Read More</button>
          </div>
          )})}
        </div>
        <div className='Kmain_card-sub'>
           {card2.map((item)=>{
            return(
            <div className='kcards'>
            <img src={item.img} alt="" className='kcard-img'/>
            <span className='kcard-head-span'> {item.span_head}</span>
            <span className='kcard-body-span'>${item.span_body}/Each</span>
            <button className='read_more' onClick={()=>onclickAbout(item)}>Read More</button>
            
          </div>
          )})} 
        </div>
        </div>
        <div className='kmain_card-popup' >
           
          <div className='kcard-popup' >
           
            {/* <div className='kcard-popup-img'>
              <img src={glass_a} alt="" className='kpopup-img' />
              <img src={glass_b} alt="" className='kpopup-img' />
              <img src={glass_c} alt="" className='kpopup-img' />
              <img src={glass_d} alt="" className='kpopup-img' />
            </div> */}
            <span className='kpcard-head-span'>Space for Ads</span>
            {/* <span className='kcard-body-span'>sdf</span> */}
            <Popup trigger={buttonPopup} setTrigger={setbuttonPopup} product={product}/>

          </div>
          
           
             
        </div>
    </div>
  )
}

export default KCardBody