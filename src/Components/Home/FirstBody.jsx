import React from 'react'
import logo from './logo.png'


const FirstBody = () => {
  return (
    <div className='firstbody'>
      <div className="fb-card">
        <img src={logo} alt="" width='100px'/>
        <span className='fb-span-1'>Variety: Shop the Best <span className='fb-span-blue-txt'>Hardware</span> Solutions.</span><br/>
        <span className='fb-span-body'>At Variety, we believe that technology should enhance your life, not complicate it. That's why we prioritize user-friendly interfaces, detailed product information, and expert customer support to assist you every step of the way.</span>
      </div>
    </div>
  )
}

export default FirstBody