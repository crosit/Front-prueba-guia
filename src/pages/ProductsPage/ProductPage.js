import React from 'react';
import './ProductPage.css';
import { useState, useEffect } from 'react';
import api from '../../utils/api';
import ProductModal from './ProductModal';
import CreateProductModal from './ProductCreateModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShoppPage = () => {
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
    

    const notify = (message) => toast.success(message);
    const notifyError = (error) => toast.error(error);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const openCreateModal = () => {
        setCreateModalIsOpen(true);
    };

    const closeCreateModal = () => {
        setCreateModalIsOpen(false);
    };

    const handleAddToCart = async (product, quantity) => {
        try {
            
            await api.post('/shoppingCarts', {
                product_id: product.id,
                quantity: quantity,
                }).then(response => {
                    console.log('response shoppingcart',response.data);
                    notify("You added a product to the cart!");
                })
                setModalIsOpen(false);
                if (product.stock - quantity === 0) {
                    fetchProducts();
                }
    
        } catch (error) {
            notifyError(error.response.data.error);
            console.log('Error al agregar al carrito:', error);
            
        }
      };

      const fetchProducts = async () => {
        try {
          const response = await api.get('/products');
          setProducts(response.data); 
          setLoading(false);
        } catch (err) {
          setError('Error to load products');
          setLoading(false);
        }
      };
    useEffect(() => {
        fetchProducts(); 
      }, []); 
    
      if (loading) return <p>Cargando productos...</p>;
      if (error) return <p>{error}</p>;

    return (
        <div className="productPage">
            <h1>Products</h1>
            <div>
            <button className="open-create-modal-button" onClick={openCreateModal}>
                Add New Product
            </button>
                <div className="products-grid" >
                    {products.map(product => (
                    <div className="product-card" key={product.id} onClick={() => openModal(product)}>
                    {/* <img src={product.imageUrl} alt={product.name} className="product-image" /> */}
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price">Stock: {product.stock}</p>
                    <p className="product-price">${product.price}</p>
                  </div>
                    ))}
                </div>
            </div>
            <ProductModal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                fetchProducts={fetchProducts}
            />
            <CreateProductModal
                isOpen={createModalIsOpen}
                onRequestClose={closeCreateModal}
                fetchProducts={fetchProducts}
            />
            <ToastContainer />
        </div>
        
    );
}

export default ShoppPage;