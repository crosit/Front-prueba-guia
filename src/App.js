import './App.css';
import { Route, Routes,useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LogginPage/LogginPage';
import ProtectedRoute from './utils/ProtectedRoute';  
import ProductPage from './pages/ProductsPage/ProductPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import CreditCardPage from './pages/CreditCardPage/CreditCardPage';
import ShoppPage from './pages/Shopps/ShoppsPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

const App = () => {
  const location = useLocation();

  const noHeaderRoutes = ['/', '/register'];

  return (
    <div>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" 
        element={
          <ProtectedRoute>
          <HomePage />
          </ProtectedRoute>
          } />
        <Route path="/products" 
        element={
          <ProtectedRoute>
          <ProductPage />
          </ProtectedRoute>
          } />
        <Route path="/shopping-cart" 
        element={
          <ProtectedRoute>
          <ShoppingCartPage />
          </ProtectedRoute>
        } />
        <Route path="/credit-card"
        element={
          <ProtectedRoute>
          <CreditCardPage />
          </ProtectedRoute>
        } />
        <Route path="/shopps"
        element={
          <ProtectedRoute>
          <ShoppPage />
          </ProtectedRoute>
        } />
        <Route path="/register"
        element={
          <RegisterPage />
        } />
      </Routes>
    </div>
  );
};

export default App;
