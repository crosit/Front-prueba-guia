import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import './CreditCardPage.css';
import CreditCardModal from './CreditCardModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreditCardPage = () => {
    const [creditCards, setCreditCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const notify = (messge) => toast.success(messge);
    const notifyError = (error) => toast.error(error);

    const fetchCreditCards = async () => {
        try {
            const response = await api.get('/creditCards');
            setCreditCards(response.data);
        } catch (error) {
            setError('Error fetching data');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCreditCards();
    }, []);
    

    const handleDeleteCard = async (number) => {
        try {
            await api.delete(`/creditCards/${number}`

            ).then (response => {
                notify('You deleted a credit card!');
            }
            );
            // Refresh the list of credit cards after deleting one
            const response = await api.get('/creditCards');
            setCreditCards(response.data);
        } catch (error) {
            notifyError(error.response.data.error);
            setError('Error deleting card');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="credit-card-list">
            <h1>Credit Cards</h1>
            <button className="add-card-button" onClick={() => setShowModal(true)}>Add New Card</button>
            <table>
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Expiration Date</th>
                        <th>CVV</th>
                        <th>Postal Code</th>
                        <th>Money</th>
                        <th>Actions</th> {/* Nueva columna para acciones */}
                    </tr>
                </thead>
                <tbody >
                    {creditCards.map((card) => (
                        <tr key={card.number}>
                            <td>{card.number}</td>
                            <td>{new Date(card.expiration_date).toLocaleDateString()}</td>
                            <td>{card.cvv}</td>
                            <td>{card.postal_code}</td>
                            <td>${card.money.toFixed(2)}</td>
                            <td>
                                <button onClick={() => handleDeleteCard(card.id)} className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <CreditCardModal
                isOpen={showModal}
                onRequestClose={() => setShowModal(false)}
                onAddCard={() => {
                    setShowModal(false);
                    
                    fetchCreditCards();
                }}
            />
            <ToastContainer />
        </div>
    );
};

export default CreditCardPage;