import React from 'react';
import './ShoppsPage.css';
import api from "../../utils/api";
import { useState, useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const ShoppPage = () => {
    const [shopps, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    // const notify = () => toast.success("You added a product to the shopp!");
    // const notifyError = (error) => toast.error(error);

    

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await api.get('/shoppsUser');
            console.log('response',response.data);
            
            setProducts(response.data); 
            
            setLoading(false);
          } catch (err) {
            setError('Error to load shopps');
            setLoading(false);
          }
        };
    
        fetchProducts(); 
      }, []); 
    
      if (loading) return <p>Cargando productos...</p>;
      if (error) return <p>{error}</p>;

    return (
        <div className="shoppingcartPage">
        <h1>Shopping List</h1>
        <div className="shopps">
            {shopps.map((shopp) => (
                <div key={shopp.id} className="shopp">
                    
                    <h3>{shopp.name}</h3>
                    <p className="shopp-description">{shopp.description}</p>
                    <p className="shopp-quantity">Quantity: {shopp.quantity}</p>
                    <p className="shopp-price">${shopp.price}</p>
                </div>
            ))}
        
        </div>
        
        

        {/* <ToastContainer /> */}
        
        </div>
    );
}

export default ShoppPage;