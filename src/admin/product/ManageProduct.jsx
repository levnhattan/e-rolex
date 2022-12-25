import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import EditProduct from './EditProduct';
import AddProduct from './AddProduct';


const ManageProduct = () => {

  const [data, setData] = useState([]);
  const [activeFormEdit, setActiveFormEdit] = useState(false);
  const [activeFormAdd, setActiveFormAdd] = useState(false);
  const [edit, setEdit] = useState({});

  const handleChangeState = () => {
    setActiveFormEdit(false);
  }
  const changeForm = () => {
    if (activeFormAdd === true) {
      return (<AddProduct />)
    } else {
      if (activeFormEdit === true) {
        return (<EditProduct
          handleChangeState={() => handleChangeState()}
          edit={edit}
        />)
      }
    }
  }
  const handleEdit = (value) => {
    setEdit(value);
    setActiveFormEdit(true);
  }
  // Read data 
  useEffect(() => {
    const productRef = ref(db, 'Product/');
    onValue(productRef, (snapshot) => {
      var tempData = [];
      snapshot.forEach((childSnapshot) => {
        var key = childSnapshot.key;
        var category = childSnapshot.val().category;
        var productName = childSnapshot.val().productName;
        var quantity = childSnapshot.val().quantity;
        var date = childSnapshot.val().date;
        var description = childSnapshot.val().description;
        var imgUrl = childSnapshot.val().imgUrl;
        var price = childSnapshot.val().price;
        var sale = childSnapshot.val().sale;
        tempData.push({
          id: key,
          productName: productName,
          category: category,
          quantity: quantity,
          date: date,
          imgUrl: imgUrl,
          description: description,
          price: price,
          sale: sale,
        })
        setData([...tempData])
      })
    })
  }, [])


  // delete user
  const deleteUser = (id) => {
    if (window.confirm("Are you sure delete this user???")) {
      const productRef = ref(db, 'Product');
      remove(child(productRef, id))
        .then(() => { toast.success("User deleted successfully!") })
        .catch(() => { toast.error("failed to delete user") })
    }
  }

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Tables</h1>
      <ol className="breadcrumb mb-4">
        <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
        <li className="breadcrumb-item active">Tables</li>
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

      <div className="row lh-auto ">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header ">
              <i className="fas fa-table me-1"></i>
              DataTable Product
            </div>
            <div className="">
              <table className="table table-light table-striped table-hover ">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Date</th>
                    <th scope="col">Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                    <th scope="col">Sale</th>
                    <th scope="col" className=''>Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.map((value, key) => {
                      return (
                        <tr key={key}>
                          <td>{value.productName}</td>
                          <td>{}</td>
                          {/* <td>{value.imgUrl}</td> */}
                          {/* <td>{URL.revokeObjectURL(`${value.imgUrl}`)}</td> */}
                          <td>{value.category}</td>
                          <td>{value.date}</td>
                          <td>{value.description}</td>
                          <td>{value.quantity}</td>
                          <td>{value.price} VNĐ</td>
                          <td>{value.sale}</td>
                          <td className="d-flex text-items-center gap-4" >
                            <button type="button" className='p-1 mb-2 btn btn-danger text-white rounded'
                              onClick={() => deleteUser(value.id)}
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

export default ManageProduct