import React from 'react'
import { useState, useEffect } from 'react';
import { createContext } from 'react'
import { card1, card2 } from '../Product/Kitchen/KitchenData';

export const ShopContext = createContext(null);

const combinedCards = card1.concat(card2);

const getCurrentInvoiceNumberFromLocalStorage = () => {
  const savedInvoiceNumber = localStorage.getItem("currentInvoiceNumber");
  return Number(savedInvoiceNumber) ? parseInt(Number(savedInvoiceNumber)) : `100001`;
};


const getDefaultCart =()=>{
    let cart ={}
    for (const product of combinedCards) {
        cart[product.id] = 0;
      }
      return cart;
    };

    const getSavedCartFromLocalStorage = () => {
        const savedCart = localStorage.getItem("MyCart");
        return savedCart ? JSON.parse(savedCart) : getDefaultCart();
      };
      



      const saveToLocalStorage = (cartItems) => {
        localStorage.setItem("MyCart", JSON.stringify(cartItems));
      };
      

      const currentInvoice = () =>{
        
      };

      const nextInvoice = () =>{
        let invoice = currentInvoice;
        invoice++;
        return invoice
      }



export const ShopContextProvider = (props) => {


   const [cartItems, setCartItems] = useState(getSavedCartFromLocalStorage());
   const [currentInvoiceNumber, setCurrentInvoiceNumber] = useState(getCurrentInvoiceNumberFromLocalStorage);

   const getNextInvoiceNumber = () => {
    const nextInvoiceNumber =  Number(currentInvoiceNumber) + 1;
    setCurrentInvoiceNumber(nextInvoiceNumber);
    localStorage.setItem("currentInvoiceNumber", nextInvoiceNumber.toString()); // Save the next invoice number to local storage
    return nextInvoiceNumber;
  };




   const getTotalCartAmount =() =>{
    let totalAmount = 0;
    for (const item in cartItems){
        if(cartItems[item] > 0){
            let itemInfo = combinedCards.find((product) => Number(product.id) === Number(item));
            totalAmount += cartItems[item] * itemInfo.span_body;
        }
    } return totalAmount;
   }

   const taxAmount =() =>{
    let totalAmount = 0;
    let taxAmt = 0
    for (const item in cartItems){
        if(cartItems[item] > 0){
            let itemInfo = combinedCards.find((product) => Number(product.id) === Number(item));
            totalAmount += cartItems[item] * itemInfo.span_body;
            taxAmt += (totalAmount*0.5)/100
        }
    } return taxAmt;
   }
   


   const cartAmount = () => {
    const cartAmtPerItem = {}; // Create an object to store cartAmt for each item ID
  
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = combinedCards.find((product) => Number(product.id) === Number(item));
  
        if (itemInfo) {
          const itemId = itemInfo.id;
          const itemQuantity = cartItems[item];
          
          // Check if the item ID exists in cartAmtPerItem object, if not, add it
          if (!cartAmtPerItem[itemId]) {
            cartAmtPerItem[itemId] = itemQuantity;
          } else {
            // If the item ID already exists, add the quantity to the existing value
            cartAmtPerItem[itemId] += itemQuantity;
          }
        }
      }
    }
  
    return cartAmtPerItem; // Return the object containing cartAmt for each item ID
  };
  





   


   const increaseCartItem = (itemId) => {
      setCartItems((prev)=> ({...prev, [itemId]: prev[itemId] + 1}))
   }

   const addToCart = (itemId) => {
    // Check if the item is already in the cart
    if (cartItems[itemId]) {
      // Item is already in the cart, show the alert
      window.alert('Item already added');
    } else {
      // Item is not in the cart, add it to the cart
      setCartItems((prevCartItems) => ({
        ...prevCartItems,
        [itemId]: (prevCartItems[itemId] || 0) + 1,
      }));
      window.alert('Your desired product is added');
    }
  };

   const removeFromCart = (itemId) => {
    setCartItems((prev)=> ({...prev, [itemId]: prev[itemId] - 1}))
 }  

 const closeFromCart = (itemId) => {
    setCartItems((prev)=> ({...prev, [itemId]: prev[itemId] = 0}))
 }  



 const updateCartItemCount = (newAmount, itemId) => {
     setCartItems((prev) => ({...prev, [itemId]: newAmount}))
 }


 const getCartLength = () => {
    let len = 0;
    for(const item in cartItems){
        if(cartItems[item] > 0){
            // let itemInfo = PRODUCTS.find((product) => product.id === item);
            len ++;
        }

    }
    return len;
}

useEffect(() => {
    saveToLocalStorage(cartItems);
  }, [cartItems]);


 const contextValue = {cartItems, 
  increaseCartItem,
  addToCart, 
  removeFromCart, 
  updateCartItemCount, 
  getTotalCartAmount,
  getCartLength, 
  closeFromCart,
  taxAmount,
  cartAmount,
  currentInvoiceNumber,
  getNextInvoiceNumber
}  

  return (
  <ShopContext.Provider value={contextValue}>
    {props.children}
    </ShopContext.Provider>  )
}
