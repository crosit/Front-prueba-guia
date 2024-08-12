import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import api from '../../utils/api';
import './ShoppingCartPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShoppingCartModal = ({ isOpen, onRequestClose,onSetShopp,total }) => {
  const [creditCards, setCreditCards] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [error, setError] = useState(null);

    const notify = (message) => toast.success(message);
    const notifyError = (error) => toast.error(error);

    useEffect(() => {
        if (isOpen) {
            
            fetchCreditCards();
        }
    }, [isOpen]);

    const fetchCreditCards = async () => {
        try {
            const response = await api.get('/creditCards');
            setCreditCards(response.data);
        } catch (error) {
            setError('Error fetching credit cards');
            
        }
    };

    const handlePayment = async () => {
        if (!selectedCard) {
            notifyError('Please select a credit card.');
            return;
        }

        
        try {
            
            
            await api.post('/shopps', {
                
                creditCardId: selectedCard,
            }).then(response => {
                console.log('resul123t',response.data.result[0].message);
                if(response.data.result[0].message === 1){
                    notify('Payment processed successfully');
                }else{
                    notifyError('Error processing payment');
                }
                
                return response.data;
            });
            
            
            
            onSetShopp();
            onRequestClose();
        } catch (error) {

          notifyError('Error processing payment');
        }
    };

    return (
      <div>
        <Modal
            isOpen={isOpen}
            
            contentLabel="Shopping Cart"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Shopping Cart</h2>
            <p>Total: ${total}</p>
            {error && <p className="error">{error}</p>}
            <div className="credit-card-list">
                <h3>Select a Credit Card</h3>
                {creditCards.length > 0 ? (
                    <ul>
                        {creditCards.map((card) => (
                            <li key={card.number}>
                                <label>
                                    <input
                                    className='radio-button'
                                        type="radio"
                                        name="creditCard"
                                        
                                        
                                        onChange={() => setSelectedCard(card.id)}
                                    />
                                    <span className="card-info">
                                      {card.number} - Money ${card.money.toFixed(2)} - Exp: {new Date(card.expiration_date).toLocaleDateString()}
                                    </span>
                                </label>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No credit cards available.</p>
                )}
            </div>
            <button onClick={handlePayment}>Pay Now</button>
            <button className='cancel-button' onClick={onRequestClose}>Cancel</button>
        </Modal>
        <ToastContainer />
        </div>
    );
};

export default ShoppingCartModal;
