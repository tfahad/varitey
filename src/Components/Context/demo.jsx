import React  from "react";
import "./Popup.css";


const InvoicePopup = (props) => {



  let userData = { name: 'Default Name', address: '', phoneNumber: '' };

  try {
    const retrieveCart = localStorage.getItem('userDetails');
    if (retrieveCart) {
      userData = JSON.parse(retrieveCart);
    }
  } catch (error) {
    console.error('Error parsing user data from local storage:', error);
  }

  return props.triggerbutton ? (
    <div className="invoicepopup">
      <div className="invoice-popup-inner">
        <button
          className="invoice-close-btn"
          onClick={() => props.settriggerbutton(false)}
        >
          x
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default InvoicePopup;