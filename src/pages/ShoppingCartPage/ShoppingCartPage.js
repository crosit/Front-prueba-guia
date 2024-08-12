import React from "react";
import "./ShoppingCartPage.css";
import api from "../../utils/api";
import ShoppingCartModal from "./ShoppingCartModal";
import { useState, useEffect } from 'react';


const ShoppingCartPage = () => {
    const [carts, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);

    
    const openModal = () => {
        
        setModalIsOpen(true);
        
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
    

    
      function calculateTotal(carts) {
        return carts.reduce((total, cart) => {
            return total + cart.product.price * cart.quantity;
        }, 0).toFixed(2);
    }

    const fetchProducts = async () => {
      try {
        const response = await api.get('/shoppingCartsUser');
        setProducts(response.data); 
        console.log('response',response.data);
        
        setLoading(false);
      } catch (err) {
        setError('Error to load carts');
        setLoading(false);
      }
    };

      useEffect(() => {
        fetchProducts(); 
      }, []); 

      
    
      if (loading) return <p>Cargando productos...</p>;
      if (error) return <p>{error}</p>;

    return (
        <div className="shoppingcartPage">
        <h1>Shopping Cart Page</h1>

        <div className="carts">
        <div className="cart">
                    
            <h3>Name</h3>
            <p className="cart-description">Description</p>
            <p className="cart-quantity">Quantity</p>
            <p className="cart-price">Price</p>
            <p className="cart-price">Total</p>

        </div>
            {carts.map((cart) => (
                <div key={cart.id} className="cart">
                    
                    <h3>{cart.product.name}</h3>
                    <p className="cart-description">{cart.product.description}</p>
                    <p className="cart-quantity">{cart.quantity}</p>
                    <p className="cart-price">${cart.product.price}</p>
                    <p className="cart-price">${cart.product.price * cart.quantity}</p>
                </div>
            ))}
        <div className="cart-total-row">
            <h3>Total:</h3>
            <p className="cart-final-total">${calculateTotal(carts)}</p>
        </div>
        </div>
        <button className="cart-button" onClick={() => openModal()}>Pay Now</button>
        <ShoppingCartModal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            onSetShopp = {() =>{
                fetchProducts();
                closeModal();
            }}
            
            total={calculateTotal(carts)}
        />

        
        </div>
    );
    }

export default ShoppingCartPage;