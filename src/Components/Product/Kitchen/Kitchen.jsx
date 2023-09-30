import React,{useEffect} from 'react'
import KFirstBody from './KFirstBody'
import KCardBody from './KCardBody';
import BrandBody from '../../Home/BrandBody';
import FirstFooter from '../../Home/FirstFooter';

const Kitchen = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='kitchen'>
      <KFirstBody/>
      <KCardBody/>
    </div>
  )
}

export default Kitchen