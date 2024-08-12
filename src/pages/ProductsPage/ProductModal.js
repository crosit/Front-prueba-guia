// src/components/ProductModal.js
import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductModal = ({ isOpen, onRequestClose, product, onAddToCart,fetchProducts }) => {
  const [quantity, setQuantity] = useState(1);

  // const notify = (message) => toast.success(message);
  const notifyError = (error) => toast.error(error);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onRequestClose();
  };

  const deleteProduct = (id) => {
    try {
      api.delete(`/products/${id}`).then(response => {
        console.log('response delete',response);
        // notify('Product deleted successfully');
        fetchProducts();  
      }).catch(error => {
        console.log('error delete',error);
        notifyError(error.response.data.message);
      });
      onRequestClose();
      
    }catch (error) {
      console.log('Error deleti ng product');

      if (error.response.status === 403) {
        notifyError(error.response.data.message);
        return;
      }
    }
  }

  return (
    <div>

    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      className="modal"
      overlayClassName="modal-overlay"
    >
      {product && (
        <>
          <button className="deleted-modal-button" onClick={()=>deleteProduct(product.id)}>
            Delete Product
          </button>
          <h2 className='product-detaills-tittle'>{product.name}</h2>
          {/* <img src={product.imageUrl} alt={product.name} className="modal-image" /> */}
          <p className='product-detaills-descripcion'>{product.description}</p>
          <p className="product-detaills-stock">Stock: {product.stock}</p>
          <p className="product-detaills-price">${product.price}</p>

          <div className="quantity-control">
            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>

          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="close-modal-button" onClick={onRequestClose}>
            Close
          </button>
          
        </>
      )}
    </Modal>
    <ToastContainer />
    </div>
  );
};

export default ProductModal;
