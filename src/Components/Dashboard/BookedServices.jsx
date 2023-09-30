import React,{useState, useEffect} from 'react'
import "./login.css"
import GreenTick from './images/yes.png';
import pendingIcon from './images/time.png';


const BookedServices = ({ orders }) => {



    const defaultStatus = 'Pending';
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    const defaultStatuses = orders.map(() => defaultStatus);
    setStatuses(defaultStatuses);
  }, [orders]); 

  const markOrderAsDone = (index) => {
    const newStatuses = [...statuses];
    newStatuses[index] = 'Done';
    setStatuses(newStatuses);

    try {
      if (index >= 0 && index < orders.length) {
        orders[index].status = 'Done';
        localStorage.setItem('bookedServices', JSON.stringify(orders));
      }
    } catch (error) {
      console.error('Error updating status in booked services:', error);
    }
  };

  if (orders.length === 0) {
    return <p className='ptag'>No orders available</p>;
  }







  return (
    <div className='dash-main'>
         {orders.map((item, index) => (
     <div className="middle-card">
        <div className='middle-card-1'>
            <span>Invoice No: {item.invoiceNumber}</span>
            <span>Date: {item.date}</span>
        </div>
        <div className='middle-card-2'>
            <div className='card2-1'>
              <span>Customer deatils:-</span>
              <span>{item.name}</span>
              <span>{item.address}</span>
              <span>{item.phoneNumber}</span>
            </div>
            <div className='card2-2'>
                <span>Ordered Products:-</span>
            {item.services.map((service, index) => (
                
              <span key={index}>[ {service.name} - {service.qty} qty ]</span>
        
              ))}
              <span>Total Amount: ${item.totalAmount}</span>
            </div>
            <div className='card2-3'>
            {item.status === 'Done' ? (
              <span className='done1-btn'><img  src={GreenTick} alt="" /> Completed</span>
              ) : ( 
                <span className='done2-btn'><img src={pendingIcon} alt="" height='30' width='30' />Pending</span>
                )}
               {item.status !== 'Done' && (
                 
                 <button className="StatusButton" onClick={() => markOrderAsDone(index)}>
                   DONE
                 </button>
             
             )}
            </div>
        </div>
     </div>
      ))}
    </div>
  )
}

export default BookedServices