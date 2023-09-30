import React,{useState,useRef, useEffect} from 'react'
import ReactDom from 'react-dom';
import "./cart.css"
import logo from './logo.png'
import {ShopContext} from '../Context/ShopContext';
import { useContext } from 'react';
import { card1,card2 } from '../Product/Kitchen/KitchenData';
import html2canvas from 'html2canvas';



const Modal1 = ({onClose,open,formattedTotal,formattedAmnt,formattedTotalAmount,taxAmt}) => {
  
  const combinedCards = card1.concat(card2);

  const savedCart = localStorage.getItem("userDetails");
  const retrieveCart = JSON.parse(savedCart);
   
  


  const name=retrieveCart.name;
  const address=retrieveCart.address;
  const mobile=retrieveCart.phoneNumber;
  const pin=retrieveCart.pin;
  


  const {cartItems , getNextInvoiceNumber, currentInvoiceNumber,updateCartItemCount,cartAmount} = useContext(ShopContext)
 
    
  const cartAmtPerItem =cartAmount();

  
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Note: months are zero-based, so we add 1 to get the correct month
  const year = currentDate.getFullYear();


  const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

  const savedData = (formattedTotalAmount-formattedAmnt).toFixed(2)
  


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
  console.log(printedImages)

  
const handleShareWhatsApp = () => {
  const message = `You have received some product order :\n\n================================\nOrder Details\n================================\n\n` +
    `Name: ${name}\n` +
    `Address: ${address}\n` +
    `Pin-code: ${pin}\n` +
    `Phone Number: ${mobile}\n\n`+
    'Ordered Products :- \n\n';

  const message2 =`\n\nTotal Amount: Rs. ${formattedAmnt}\n`;

  const servicesDetails = combinedCards.filter((product) => cartItems[product.id] !== 0)
    .map((product) => `\n========================= \nProduct:  ${product.span_head}   \nQty:  ${cartAmtPerItem[product.id]} \nPrice : ${product.span_body} \n=========================`)
    .join('\n');

  const fullMessage = `${message}${servicesDetails}${message2}`;

  const encodedMessage = encodeURIComponent(fullMessage);
  const whatsappURL = `https://api.whatsapp.com/send?phone=${encodeURIComponent('7994653601')}&text=${encodedMessage}`;
  
  window.open(whatsappURL);
};


// Name: Sharath King
// Address: Manjeri
// Pin-code: 626262
// Phone Number: 79946536071

const invoiceDetails = {
  invoiceNumber: Number(currentInvoiceNumber),
  name,
  mobile,
  address,
  date: formattedDate,
  services: combinedCards.filter((product) => cartItems[product.id] !== 0).map((product) => ({
    name: product.span_head,
    qty:cartAmtPerItem[product.id],
    price: product.span_body,
  })),
  totalAmount: formattedAmnt,
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


   if(!open) return null

  return ReactDom.createPortal(
    <>

    <div className='overlay1' />
    

   
    <div className='modal1' >
      
        <div className='modal_top'>
        <img src={logo} alt="" width="150px"/>
        <button onClick={onClose} className='close'>X</button>
        </div>
       
        <div className='bill_head'>
        <span className='bill_spanbody'>Name: {name}</span>
        <span className='bill_spanbody'>Address: {address}</span>
        <span className='bill_spanbody'>Invoice: {currentInvoiceNumber}</span>
        <span className='bill_spanbody'>date: {formattedDate}</span>
      



        </div>
        <div className='tablediv'>
            <table className='table'>
               
                <thead >
                  <td >TABLE DESCRIPTION</td>
                  <td>QTY</td>
                  <td>PRICE</td>
                 
                  {/* <td>QTY</td>
                  <td>TOTAL</td> */}

                </thead>
                
               

               {combinedCards.map((item)=>{
                if (cartItems[item.id] !== 0){return( 
                  <tr>
                
                <td>{item.span_head}</td>
                <td>{cartAmtPerItem[item.id]}</td>
                <td>{item.span_body}</td>
                
               </tr>
               )}else{
                return null
               }
               })}
             
              
            </table>
        </div>
        <div className='popular_search'>
            <div className='ps'>
                
            </div>
            <div className='ps'>
                <span className='ps_head'>Subtotal: {formattedTotalAmount}</span>
                <span className='ps_head'>Tax: {taxAmt}</span>
                <span className='ps_head'>Saved: {savedData < 0 ? "0.00" : savedData}</span>
                <hr className='bill-hr'/>
                <span className='ps_head'>Grand Total: {formattedAmnt}</span>
            </div>
        </div>
        <div className="PrintButton"><button className='PrintPageButton'onClick={()=>{handleShareWhatsApp(); getNextInvoiceNumber(); addToLocStore(invoiceDetails); onClose()}} >Confirm Order</button></div>

        </div>

      
    
    </>,
    document.getElementById('portal')
    
  )
}

export default Modal1