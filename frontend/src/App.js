import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  SellerActivationPage,
  ShopLoginPage,
  CheckoutPage,
  PaymentPage,
  OrderDetailsPage,
  TrackOrderPage,
  UserInbox
} from './routes/Routes';
import Store from './redux/store';
import { loadSeller, loadUser } from './redux/actions/user';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './routes/ProtectedRoute';
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import {
  ShopAllCoupouns,
  ShopAllEvents,
  ShopAllOrders,
  ShopAllProducts,
  ShopAllRefunds,
  ShopCreateEvents,
  ShopCreateProduct,
  ShopDashboardPage,
  ShopHomePage,
  ShopOrderDetails,
  ShopPreviewPage,
  ShopWithDrawMoneyPage,
  ShopSettingsPage,
  ShopInboxPage,
} from './routes/ShopRoutes';

import { getAllEvents } from './redux/actions/event';
import { getAllProducts } from './redux/actions/product';
import axios from 'axios';
import { server } from './server';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import {AdminDashboardPage, AdminDashboardUsers} from './routes/AdminRoutes';
import ProtectedAdminRoute from './routes/ProtectedAdminRoute';


function App() {
  const [stripeApikey, setStripeApiKey] = useState("");

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    getStripeApikey();
  }, [])
  return (
    <>
      <BrowserRouter>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:id' element={<ProductDetailsPage />} />
          <Route path='/profile' element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route
            path="/user/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetailsPage />
              </ProtectedRoute>
            }
          />
           <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <UserInbox />
            </ProtectedRoute>
          }
        />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path='/best-selling' element={<BestSellingPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/faq' element={<FAQPage />} />
          <Route path='/activation/:activation_token' element={<ActivationPage />} />
          {/* shop route */}
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path='/shop-create' element={<ShopCreatePage />} />
          <Route path='/shop-login' element={<ShopLoginPage />} />
          <Route path='/shop/:id' element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          } />
          <Route path='/settings' element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-orders' element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          } />
          <Route path='/order/:id' element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          } />
          <Route path='dashboard-refunds' element={
            <SellerProtectedRoute>
              <ShopAllRefunds />
            </SellerProtectedRoute>
          } />
          <Route path='/user/track/order/:id' element={
            <SellerProtectedRoute>
              <TrackOrderPage />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard' element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-create-product' element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-products' element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-create-event' element={
            <SellerProtectedRoute>
              <ShopCreateEvents />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-events' element={
            <SellerProtectedRoute>
              <ShopAllEvents />
            </SellerProtectedRoute>
          } />
          <Route path='/dashboard-coupouns' element={
            <SellerProtectedRoute>
              <ShopAllCoupouns />
            </SellerProtectedRoute>
          } />
          <Route
            path="/dashboard-withdraw-money"
            element={
              <SellerProtectedRoute>
                <ShopWithDrawMoneyPage />
              </SellerProtectedRoute>
            }
          />
          <Route
            path="/dashboard-messages"
            element={
              <SellerProtectedRoute>
                <ShopInboxPage />
              </SellerProtectedRoute>
            }
          />
          <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
          {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardPage />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin-users"
          element={
            <ProtectedAdminRoute>
              <AdminDashboardUsers />
            </ProtectedAdminRoute>
          }
        />
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
