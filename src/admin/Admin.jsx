import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import '../styles/admin.css'
import { db } from '../firebase.confige'
import { set, ref, child, push, update } from "firebase/database";
import AdminNav from '../admin/component/AdminNav';
import Statistical from '../admin/component/Statistical'
import Chart from '../admin/component/Chart';
import ManageUser from './user/ManageUser'
import ManageProduct from './product/ManageProduct'
import ManageBill from './bill/ManageBill'
import ManageOrder from './order/ManageOrder'


const Admin = () => {
  const [tab, setTab] = useState("0");

  const renderUi = () => {
    switch (tab) {
      case "1":
        return (
          <ManageUser />
        )
      case "2":
        return (
          <ManageProduct />
        )
      case "3":
        return (
          <ManageBill />
        )
      
      case "5":
        return (
          <ManageOrder />
        )
      default:
        return (
          <div className="container-fluid px-4">
            <h1 className="mt-4">Dashboard</h1>
            <ol className="breadcrumb mb-4">
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
            <Statistical />
            <Chart />
          </div>
        )
    }


  }
const changeAdmin = () =>{
  setTab("10");
}
  return (
    <div className='sb-nav-fixed'>
      <div>
        <AdminNav changeAdmin = {() => changeAdmin()}/>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
              <div className="sb-sidenav-menu">
                <div className="nav mt-5">
                  <a className="nav-link collapsed " href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                    <div className="sb-nav-link-icon"><i className="fas fa-columns" /></div>
                    Manage Product
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                  </a>
                  <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                      <a className="nav-link" onClick={() => setTab("2")}>Product</a>
                      <a className="nav-link" onClick={() => setTab("3")} >Product Bill</a>
                    </nav>
                  </div>

                  <a onClick={() => setTab("1")} className="nav-link mt-3" href="#" >
                    <div className="sb-nav-link-icon" ><i className="fas fa-chart-area" /></div>
                    Manage User
                  </a>
                  <a className="nav-link mt-3" onClick={() => setTab("5")}>
                    <div className="sb-nav-link-icon" ><i className="fas fa-table" /></div>
                    Manage Order
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              {
                renderUi()
              }
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin