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
import ManageBill from '../admin/ManageBill'
import ManageOrder from '../admin/ManageOrder'
import ManageProduct from '../admin/ManageProduct'
import ManageSale from '../admin/ManageSale'
import ManageUser from '../admin/ManageUser'

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
        <Route path='admin' element={<Admin />}>
        <Route path='admin/user' element={<ManageUser />}></Route>

        </Route>
        <Route path='user' element={<ManageUser />}></Route>
        <Route path='order' element={<ManageOrder />}></Route>
        <Route path='product' element={<ManageProduct />}></Route>
        <Route path='bill' element={<ManageBill />}></Route>
        <Route path='sale' element={<ManageSale />}></Route>
      </Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
    </Routes>
  );
};

export default Routers