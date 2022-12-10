import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import '../styles/admin.css'
import { db } from '../firebase.confige'
import { set, ref, child, push, update } from "firebase/database";

const initState = {
  name: '',
  email: '',
}
const Admin = () => {
  const [state, setState] = useState(initState);
  const [data, setData] = useState({});
  const { name, email } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      toast.error("Please enter input")
    } else {
      const userRef = ref(db, 'User');
      const newUser = push(userRef);
      // console.log(newUser);
      if(newUser){
        set(newUser, {
          name: state.name,
          email: state.email,
        });
        toast.success("Add User Successfully!");
      }else{
        toast.success("Add User Fail!");
      }
    }
    setState("");
  }
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  }
  return (
    <div className='sb-nav-fixed'>
      <div>
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          {/* Navbar Brand*/}
          <a className="navbar-brand ps-3" href="index.html">Admin</a>
          {/* Sidebar Toggle*/}
          <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i className="fas fa-bars" /></button>
          {/* Navbar Search*/}
          <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
              <button className="btn btn-primary" id="btnNavbarSearch" type="button"><i className="fas fa-search" /></button>
            </div>
          </form>
          {/* Navbar*/}
          <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw" /></a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="#!">Settings</a></li>
                <li><a className="dropdown-item" href="#!">Activity Log</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#!">Logout</a></li>
              </ul>
            </li>
          </ul>
        </nav>
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
                      <a className="nav-link" href="layout-static.html">Product</a>
                      <a className="nav-link" href="layout-static.html">Product Bill</a>
                      <a className="nav-link" href="layout-sidenav-light.html">Product Sale</a>
                    </nav>
                  </div>
                  
                  <a className="nav-link mt-3" href="charts.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area" /></div>
                    Manage User
                  </a>
                  <a className="nav-link mt-3" href="tables.html">
                    <div className="sb-nav-link-icon"><i className="fas fa-table" /></div>
                    Manage Order
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div id="layoutSidenav_content">
            <main>
              <div className="container-fluid px-4">
                <h1 className="mt-4">Dashboard</h1>
                <ol className="breadcrumb mb-4">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
                <div className="row">
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-primary text-white mb-4">
                      <div className="card-body">Primary Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-warning text-white mb-4">
                      <div className="card-body">Warning Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-success text-white mb-4">
                      <div className="card-body">Success Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-md-6">
                    <div className="card bg-danger text-white mb-4">
                      <div className="card-body">Danger Card</div>
                      <div className="card-footer d-flex align-items-center justify-content-between">
                        <a className="small text-white stretched-link" href="#">View Details</a>
                        <div className="small text-white"><i className="fas fa-angle-right" /></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-area me-1" />
                        Area Chart Example
                      </div>
                      <div className="card-body"><canvas id="myAreaChart" width="100%" height={40} /></div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <div className="card mb-4">
                      <div className="card-header">
                        <i className="fas fa-chart-bar me-1" />
                        Bar Chart Example
                      </div>
                      <div className="card-body"><canvas id="myBarChart" width="100%" height={40} /></div>
                    </div>
                  </div>
                  <div className="col-xl-6">
                    <form onSubmit={handleSubmit} type='submit' >
                      <label htmlFor="name">Name</label>
                      <input type="text" id='name' name='name' placeholder="Enter Your Name..."
                        value={name} onChange={handleInputChange} /> <br />
                      <label htmlFor="email">Email</label>
                      <input type="email" id='email' name='email' placeholder="Enter Your Email..."
                        value={email} onChange={handleInputChange} /> <br />
                      <input type="submit" value="Save" onClick={handleSubmit} />
                    </form>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin