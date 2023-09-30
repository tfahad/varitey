import React from 'react'
import lg from './brand/lg.png';
import tesla from './brand/tesla.png';
import bosch from './brand/bosch.png';
import philips from './brand/philips.png';
import vguard from './brand/vguard.png';
import lowes from './brand/lowes.png';

const BrandBody = () => {
  return (
    <div className='brandbody'>
        <div className='brands'>
            <img src={lg} alt="" width='60px' height='60px' />
            <img src={tesla} alt="" width='100px' height='80px' />
            <img src={bosch} alt="" width='200px' height='100px' />
            <img src={philips} alt="" width='120px' height='70px' />
            <img src={vguard} alt="" width='150px' height='80px' />
            <img src={lowes} alt="" width='150px' height='150px' />
        </div>
        <br/>
        <br/>
        <span className="brand_text" >
            The world's best product teams trust VARIETY to deliver an unrivaled experience for both developers and users.
        </span>
    </div>
  )
}

export default BrandBody