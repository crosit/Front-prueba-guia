import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../../utils/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCreateModal = ({ isOpen, onRequestClose,fetchProducts }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const notify = (message) => toast.success(message);
    const notifyError = (error) => toast.error(error);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newProduct = {
            name,
            description,
            price: parseFloat(price),
            stock: parseInt(stock, 10),
        };

        try {
            await api.post('/products', newProduct).then((response) => {
                
                notify('Product created successfully');
                fetchProducts();
                onRequestClose(); 
                
            });
            
        } catch (error) {
            console.log('response',error);
                
                if(error.response.status === 403){
                    notifyError(error.response.data.message);
                    return;
                }
            console.error('Error creating product:', error);
           
        }
    };

    return (
        <div>
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Create Product"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Create New Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name: 
                    <br/>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Description: 
                    <br/>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Price:
                    <br/>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Stock:
                    <br/>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Create Product</button>
                <button type="button" onClick={onRequestClose}>Close</button>
            </form>
        </Modal>
        <ToastContainer />
        </div>
    );

}

export default ProductCreateModal;