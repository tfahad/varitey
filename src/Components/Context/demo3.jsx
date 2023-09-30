import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import plogo from '../EduMechsLogo_prev_ui.png';
import { PRODUCTS } from './product';
import { useContext } from 'react';
import { ShopContext } from '../../context/shop-context';
import html2canvas from 'html2canvas';

const PrintModal = ({ onClose, open, formattedTotalAmount, formattedSubTotalAmount, formattedAmnt }) => {
  const { cartItems, getSubTotalCartAmount, getTotalCartAmount, currentInvoiceNumber, getNextInvoiceNumber } = useContext(
    ShopContext
  );
  const subTotalAmount = getSubTotalCartAmount();
  const totalAmount = getTotalCartAmount();

  const retrievedData = localStorage.getItem('userDetails');
  const userData = JSON.parse(retrievedData);

  const name = userData.name;
  const address = userData.address;
  const phoneNumber = userData.phoneNumber;

  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Note: months are zero-based, so we add 1 to get the correct month
  const year = currentDate.getFullYear();

  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

  const printableRef = useRef(null);

  const [printedImages, setPrintedImages] = useState([]);

  const handlePrint = async () => {
    try {
      const canvas = await html2canvas(printableRef.current);
      const image = canvas.toDataURL('image/png');
      setPrintedImages([...printedImages, image]);

      // Optionally, you can open a new window and display the image for the user to print manually
      const printWindow = window.open('', '_blank');
      printWindow.document.write('<img src="' + image + '" />');
      printWindow.document.close();
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  const [LocStoreData, setLocStoreData] = useState([]);

  useEffect(() => {
    const storedBookedServices = localStorage.getItem('bookedServices');
    if (storedBookedServices) {
      setLocStoreData(JSON.parse(storedBookedServices));
    }
  }, []);

  const addToLocStore = (invoiceDetails) => {
    // Add the new invoiceDetails to the existing booked services array with status "Pending"
    const updatedInvoiceDetails = { ...invoiceDetails, status: 'Pending' };
    const updatedBookedServices = [...LocStoreData, updatedInvoiceDetails];

    // Update the state with the updated booked services array
    setLocStoreData(updatedBookedServices);

    // Store the updated array in localStorage
    localStorage.setItem('bookedServices', JSON.stringify(updatedBookedServices));
  };

  const markOrderAsDone = (index) => {
    const newStatuses = [...LocStoreData];
    newStatuses[index].status = 'Done';
    setLocStoreData(newStatuses);
    localStorage.setItem('bookedServices', JSON.stringify(newStatuses));
  };

  const invoiceDetails = {
    invoiceNumber: currentInvoiceNumber,
    name,
    phoneNumber,
    address,
    date: formattedDate,
    services: PRODUCTS.filter((product) => cartItems[product.id] !== 0).map((product) => ({
      name: product.Head,
      price: product.Price2,
    })),
    totalAmount: formattedAmnt,
  };

  const handleShareWhatsApp = () => {
    localStorage.setItem('bookedServices', JSON.stringify(LocStoreData));

    const message = `You have received a service order :\n\n================================\nOrder Details\n================================\n\n` +
      `Name: ${name}\n` +
      `Address: ${address}\n` +
      `Phone Number: ${phoneNumber}\n\n` +
      'Booked services \n\n';

    const message2 = `\n\nTotal Amount: Rs. ${formattedAmnt}\n`;

    const servicesDetails = PRODUCTS.filter((product) => cartItems[product.id] !== 0)
      .map((product) => `${product.Head}: ${product.Price2}`)
      .join('\n');

    const fullMessage = `${message}${servicesDetails}${message2}`;

    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappURL = `https://api.whatsapp.com/send?phone=919633129512&text=${encodedMessage}`;

    window.open(whatsappURL);
  };

  if (!open) return null;
  return ReactDom.createPortal(
    <div>
      <div className='overlay' />
      <div className='Printmodal'>
        <div ref={printableRef}>
          <div className='Printmodal_top'>
            <button onClick={onClose} className='close'>
              X
            </button>
            <div className='Printpop1'>
              <div className='mlogo'>
                <img className='logo' style={{ marginLeft: '0' }} src={plogo} alt='' />
                <span className='font2 Printpsf2'>Janathappadi,Nilambur</span>
                <span className='font2 psf2' style={{ color: 'black' }}>
                  Kerela,676523
                </span>
              </div>
              <div className='Printpop1a'>
                <span className='Printpsf1'>INVOICE </span>
              </div>
            </div>
          </div>
          <div className='popular_search'>
            <div className='BillAddress'>
              <div className='BillAddressData'>
                <h4>Billing Address</h4>
                <p>Name : {name}</p>
                <p>Address : {address}</p>
              </div>
              <div className='InvoiceData'>
                <p className='font2' style={{ color: 'black' }}>
                  Invoice No : {currentInvoiceNumber}
                </p>{' '}
                {/* Display the current invoice number */}
                <p className='font2' style={{ color: 'black' }}>
                  Date : {formattedDate}
                </p>
              </div>
            </div>
            <div className='Tabledata'>
              <table className='PrintTable'>
                <thead className='TableHead'>
                  <tr className='TableHeadRow'>
                    <th className='TableHeadData1'>Serivices</th>
                    <th className='TableHeadData2'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {PRODUCTS.map((product) => {
                    if (cartItems[product.id] !== 0) {
                      return (
                        <tr key={product.id}>
                          <td className='TableRowData1'>{product.Head}</td>
                          <td className='TableRowData1'>{product.Price2}</td>
                        </tr>
                      );
                    } else {
                      return null; // Return null if cartItems[product.id] is 0
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className='FinalAmounts'>
              <div className='FinalAmountssub'>
                <p className='finalamountsub1'>
                  Subtotal <p>: {formattedTotalAmount}</p>
                </p>
                <p className='finalamountsub1'>
                  Coupon Discount <p>: {(formattedTotalAmount - formattedAmnt).toFixed(2)}</p>
                </p>
                <p className='finalamountsub1 totalfont'>
                  Grand Total <p>: {formattedAmnt} </p>
                </p>
              </div>
            </div>
            <hr className='PrintHr' />
            <p className='ThankYou'>Thank you for booking service with us ! </p>
          </div>
        </div>
        <div className='PrintButton'>
          <button
            className='PrintPageButton'
            onClick={() => {
              handleShareWhatsApp();
              getNextInvoiceNumber();
              handlePrint();
              onClose();
              addToLocStore(invoiceDetails);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default PrintModal;