import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import AddUser from './AddUser';
import EditUser from './EditUser';
import './style.css';


const ManageUser = () => {

  const [data, setData] = useState([]);
  const [activeFormEdit, setActiveFormEdit] = useState(false);
  const [activeFormAdd, setActiveFormAdd] = useState(false);
  const [editUser, setEditUser] = useState({});


  const handleChangeState = () => {
    setActiveFormEdit(false);
  }
  const changeForm = () => {
    if (activeFormAdd === true) {
      return (<AddUser />)
    } else {
      if (activeFormEdit === true) {
        return (<EditUser
          handleChangeState={() => handleChangeState()}
          editUser={editUser}
        />)
      }
    }
  }
  const handleEdit = (value) => {
    setEditUser(value)
    setActiveFormEdit(true)
  }
  // Read data 
  useEffect(() => {
    const userRef = ref(db, 'User/');
    onValue(userRef, (snapshot) => {
      var tempData = [];
      snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key;
        var name = childSnapshot.val().name;
        var email = childSnapshot.val().email;
        var password = childSnapshot.val().password;
        var phone = childSnapshot.val().phone;
        var address = childSnapshot.val().address;
        var role = childSnapshot.val().role;
        tempData.push({
          id: key,
          name: name,
          email: email,
          password: password,
          phone: phone,
          address: address,
          role: role,
        })
        setData([...tempData])
      })
    })
  }, [])


  // delete user
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure delete this user???")) {
      const auth = getAuth();
      const user = auth.currentUser;
      deleteUser(user)
      const userRef = ref(db, 'User');
      remove(child(userRef, id))
        .then(() => { toast.success("User deleted successfully!") })
        .catch(() => { toast.error("failed to delete user") })
    }
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">User Management</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
        <li className="breadcrumb-item active">User</li>
      </ol>
      <div className=" row">
        <div className="col-10">
          <form className="d-none d-md-inline-block form-inline  w-100">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
              <button className="btn btn-primary " id="btnNavbarSearch" type="button"><i className="fas fa-search" /></button>
            </div>
          </form>
        </div>
        <div className="col-2">
          <button type="button" className='btn btn-outline-info ml-5 text-dark'
            onClick={() => setActiveFormAdd(!activeFormAdd)}>Thêm Mới</button>
        </div>
      </div>

      <div className="row lh-auto main__user">
        <div className="col-md-12">
          <div className="card mb-4">
          </div>
          <div className="card mb-4">
            <div className="card-header ">
              <i className="fas fa-table me-1"></i>
              DataTable User
            </div>
            <div className="">
              <table className="table table-light table-striped table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    <th scope="col">Role</th>

                    <th scope="col" className=''>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((value, key) => {
                      return (
                        <tr key={key}>
                          <td>{value.name}</td>
                          <td>{value.email}</td>
                          <td>{value.password}</td>
                          <td>{value.phone}</td>
                          <td>{value.address}</td>
                          <td>{value.role}</td>

                          <td className="d-flex text-items-center gap-4" >
                            <button type="button" className='p-1 mb-2 btn btn-danger text-white rounded'
                              onClick={() => handleDeleteUser(value.id)}
                            > Delete
                            </button>
                            <button type="button"
                              className='p-1 mb-2 btn btn-info text-dark  text-white bg-gradient rounded'
                              onClick={() => handleEdit(value)}
                            > Edit </button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          {
            changeForm()
          }
        </div>
      </div>
    </div>
  )
}

export default ManageUser