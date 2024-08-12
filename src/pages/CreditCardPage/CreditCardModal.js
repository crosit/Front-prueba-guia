import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../../utils/api';
import './CreditCardPage.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreditCardModal({ isOpen, onRequestClose, onAddCard }) {
    
    const notifyError = (error) => toast.error(error);

    const [newCard, setNewCard] = useState({
        number: '',
        expiration_date: '',
        cvv: '',
        postal_code: '',
        money: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard(prevCard => ({
            ...prevCard,
            [name]: value
        }));
    };

    const handleAddCard = async (e) => {
        e.preventDefault();
        try {
            await api.post('/creditCards', newCard);
            onAddCard();
            setNewCard({
                number: '',
                expiration_date: '',
                cvv: '',
                postal_code: '',
                money: ''
            });

        } catch (error) {
            notifyError(error.response.data.error);
            console.error('Error adding card', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Add New Credit Card"
            className="modal"
            overlayClassName="overlay"
        >
            <h2>Add New Credit Card</h2>
            <form onSubmit={handleAddCard}>
                <label>
                    Number:
                    <input
                        type="text"
                        name="number"
                        value={newCard.number}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Expiration Date:
                    <input
                        type="date"
                        name="expiration_date"
                        value={newCard.expiration_date}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    CVV:
                    <input
                        type="text"
                        name="cvv"
                        value={newCard.cvv}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="postal_code"
                        value={newCard.postal_code}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Money:
                    <input
                        type="number"
                        name="money"
                        value={newCard.money}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <button type="submit">Add Card</button>
                <button type="button" onClick={onRequestClose}>Cancel</button>
            </form>
            <ToastContainer />
        </Modal>
    );
};

export default CreditCardModal;