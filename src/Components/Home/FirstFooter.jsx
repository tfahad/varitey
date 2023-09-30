import React from 'react'
import logo from './footer_logo.png'
import sm1 from './social_media/twitter.png'
import sm2 from './social_media/whatsapp.png'
import sm4 from './social_media/instagram.png'

const FirstFooter = () => {
  return (
    <div className='firstfooter'>
        <div className="footer">
            <img src={logo} alt="" width='110px' height='35px'/>
            <span className='footer_text'> Copyright © 2023 VARIETY.</span>
        </div>
        <div className="right_footer">
           <img src={sm1} alt="" />
           <img src={sm2} alt="" />
           <img src={sm4} alt="" />
        </div>
    </div>
  )
}

export default FirstFooter