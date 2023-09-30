import React,{useEffect} from 'react'
import FirstBody from './FirstBody'
import CardsBody from './CardsBody'
import BrandBody from './BrandBody'
import FeedbackBody from './FeedbackBody'
import FirstFooter from './FirstFooter'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    
    <div className='home'>
        <FirstBody/>
        <CardsBody/>
        <BrandBody/>
        <FeedbackBody/>
        <FirstFooter/>
    </div>
  )
}

export default Home