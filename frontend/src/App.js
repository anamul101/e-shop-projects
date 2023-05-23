import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { LoginPage, SignupPage,ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPage, OrderSuccessPage, ProductDetailsPage, ProfilePage, ShopCreatePage, SellerActivationPage, ShopLoginPage } from './routes/Routes';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routes/ProtectedRoute';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import { ShopAllCoupouns, ShopAllEvents, ShopAllProducts, ShopCreateEvents, ShopCreateProduct, ShopDashboardPage, ShopHomePage } from './routes/ShopRoutes';
import { getAllEvents } from './redux/actions/event';
import { getAllProducts } from './redux/actions/product';

function App() {
  useEffect(()=>{
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
  },[])
  return (
    <>
        <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/products' element={<ProductsPage/>}/>
        <Route path='/product/:name' element={<ProductDetailsPage/>}/>
        <Route path='/profile' element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>
        }/>
        <Route path='/best-selling' element={<BestSellingPage/>}/>
        <Route path='/events' element={<EventsPage/>}/>
        <Route path='/faq' element={<FAQPage/>}/>
        <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
        {/* shop route */}
        <Route path='/shop-create' element={<ShopCreatePage/>}/>
        <Route path='/shop-login' element={<ShopLoginPage/>}/>
        <Route path='/shop/:id' element={
          <SellerProtectedRoute>
            <ShopHomePage/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard' element={
          <SellerProtectedRoute>
            <ShopDashboardPage/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-create-product' element={
          <SellerProtectedRoute>
            <ShopCreateProduct/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-products' element={
          <SellerProtectedRoute>
            <ShopAllProducts/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-create-event' element={
          <SellerProtectedRoute>
            <ShopCreateEvents/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-events' element={
          <SellerProtectedRoute>
            <ShopAllEvents/>
          </SellerProtectedRoute>
        }/>
        <Route path='/dashboard-coupouns' element={
          <SellerProtectedRoute>
            <ShopAllCoupouns/>
          </SellerProtectedRoute>
        }/>
        <Route path='/seller/activation/:activation_token' element={<SellerActivationPage/>}/>
      </Routes>
      <Toaster
      position="top-center"
      reverseOrder={false}
      ></Toaster>
    </BrowserRouter>
      
    
    </>
  );
}

export default App;
