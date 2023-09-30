import React from 'react'
import kitchen from './kitchen.png';
import cable from './cables.png';
import tool from './tools.png';
import lock from './lock.png';
import paint from './paint.png';
import door from './door_handle.png';
import led from './led.png';
import bolt from './fastener.png';
import { Link } from 'react-router-dom';







const CardsBody = () => {


    const card1=[{
        img : kitchen,
        span_head:  'Kitchen Accessories',
        span_body: 'From stylish and functional utensils to innovative gadgets and time-saving appliances.',
        Link: "/Kitchen"
    },
    {
        img : cable,
        span_head:  'Cable & Wires',
        span_body: 'Discover the power and versatility of our electrical wires, built to withstand the demands of both residential and commercial installations.'
    },
    {
        img : tool,
        span_head:  'Tool',
        span_body: 'From construction and woodworking to gardening and automotive repair, our tools are your reliable companions, ready to lend their strength to your projects.'
    },
    {
        img : lock,
        span_head:  'Lock Accessories',
        span_body: 'Explore a selection of sturdy and reliable lock cylinders, designed to fit various lock types and provide an additional layer of protection against tampering and picking.'
    },]

    const card2=[{
        img : paint,
        span_head:  'Paint & Brushes',
        span_body: 'Unleash your creativity and embrace the artistry of colors with our premium paints. '
    },
    {
        img : door,
        span_head:  'Door Handles',
        span_body: 'Choose from lever handles, knob handles, pull handles, and more, each designed to deliver seamless performance and enhance the accessibility of your spaces.'
    },
    {
        img : led,
        span_head:  'LED bulbs & Etc',
        span_body: 'Experience the joy of instant illumination as our LED bulbs power up to full brightness without any warm-up time.'
    },
    {
        img : bolt,
        span_head:  'Fasteners & Bolts',
        span_body: 'Explore a vast selection of fasteners, including screws, nuts, washers, and more, each designed to provide a secure and lasting hold.'
    },]
    
    
  return (
    <div className='cardsbody'>
        <div className='main_card'>

          {card1.map((item)=>{
            return(
              <Link to={item.Link } className='divert'><div className='cards'>
            <img src={item.img} alt="" className='card-img'/>
            <span className='card-head-span'> {item.span_head}</span>
            <span className='card-body-span'>{item.span_body}</span>
           
          </div> </Link>)
          })}

        </div>
        <div className='main_card'>

          {card2.map((item)=>{
            return(<div className='cards'>
            <img src={item.img} alt="" className='card-img'/>
            <span className='card-head-span'> {item.span_head}</span>
            <span className='card-body-span'>{item.span_body}</span>
          </div>
          )
          })}
             
        </div>
    </div>
  )
}

export default CardsBody