import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Home from '../pages/Home'
import Shop from '../pages/Shop'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import ProtectedRouter from './ProtectedRouter'
import Admin from '../admin/Admin'
import ManageUser from '../admin/user/ManageUser'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='home' />} />
      <Route path='home' element={<Home />}></Route>
      <Route path='shop' element={<Shop />}></Route>
      <Route path='shop/:id' element={<ProductDetails />}></Route>
      <Route path='cart' element={<Cart />}></Route>
      <Route path='/*' element={<ProtectedRouter />}>
        <Route path='checkout' element={<Checkout />}></Route>
        <Route path='user' element={<ManageUser />}></Route>
      </Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
    </Routes>
  );
};

export default Routers