import React from 'react'
import ReactDom from 'react-dom';

const Modal = ({onClose,open}) => {

   if(!open) return null

  return ReactDom.createPortal(
    <>

    <div className='overlay' />
    <div className='modal'>


        <div className='modal_top'>
        <input type="text" placeholder='🔍 Search...  ' className='navSearch'  />
        <button onClick={onClose} className='close'>X</button>
        </div>
        <hr />
        <div className='popular_search'>
            <div className='ps'>
                <span className='ps_head'>Popular Searches</span>
                <span className='ps_body'>Fasteners & Bolts</span>
                <span className='ps_body'>Door handles</span>
                <span className='ps_body'>Decoration Bulbs</span>
            </div>
            <div className='ps'>
                <span className='ps_head'>New Stock</span>
                <span className='ps_body'>Tesla LEDs</span>
                <span className='ps_body'>Locks</span>
                <span className='ps_body'>Classic cables</span>
            </div>
        </div>
        <div className='popular_search'>
            <div className='ps'>
                <span className='ps_head'>Services</span>
                <span className='ps_body'>Wiring</span>
                <span className='ps_body'>Door handles</span>
                <span className='ps_body'>Decoration Bulbs</span>
            </div>
            <div className='ps'>
                <span className='ps_head'>Pricing</span>
                <span className='ps_body'>Low</span>
                <span className='ps_body'>Medium</span>
                <span className='ps_body'>High</span>
            </div>
        </div>
       
        
        
    </div>
    </>,
    document.getElementById('portal')
    
  )
}

export default Modal