import React, { useState, useEffect } from 'react';
import GreenTick from './Images/tick-mark.png';
import pendingIcon from './Images/order-history.png';

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
    return <p>No booked services available.</p>;
  }

  return (
    <div>
      {orders.map((item, index) => (
        <div key={item.invoiceNumber} className="AdmincartitemsMain font2">
          <div className="Admincartitems-main1">
            <p className="AdminCartitemshead">
              <b>{item.invoiceNumber}</b>
              <p className="font4">{item.date}</p>
            </p>
            <div className="AdminMainsub1">
              <div className="Admincartdesc">
                <div>
                  <h4>CUSTOMER DETAILS :</h4>
                  <p>{item.name}</p>
                  <p>{item.address}</p>
                  <p>{item.phoneNumber}</p>
                </div>
              </div>
              <div className="Admincartdesc">
                <div className="AdminCartsub1a">
                  <h4>BOOKED SERVICES :</h4>
                  {item.services.map((service, index) => (
                    <div key={index}>
                      <p className="font2">{service.name}</p>
                    </div>
                  ))}
                  <p className="" style={{ color: 'white', fontSize: '14px',marginTop:'10px' }}>
                    <b>Total : Rs. {item.totalAmount} only</b>
                  </p>
                </div>
              </div>
              <div className="status">
                {item.status === 'Done' ? (
                  <p className="BookingStatus" style={{ color: 'green' }}>
                    <img src={GreenTick} style={{ width: '20px', height: '20px', marginRight: '3px' }} alt="Done" /> completed
                  </p>
                ) : (
                  <p className="BookingStatus" style={{ color: 'yellow' }}>
                    <img src={pendingIcon} style={{ width: '20px', height: '20px', marginRight: '3px' }} alt="Pending" /> pending
                  </p>
                )}
                {item.status !== 'Done' && (
                 
                    <button className="StatusButton" onClick={() => markOrderAsDone(index)}>
                      DONE
                    </button>
      
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookedServices;