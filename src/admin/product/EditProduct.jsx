import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import { ref as RefS, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import './style.css'

const EditProduct = (props) => {

  const initState = {
    id: props.edit.id,
    productName: props.edit.productName,
    category: props.edit.category,
    date: props.edit.date,
    description: props.edit.description,
    quantity: props.edit.quantity,
    price: props.edit.price,
    sale: props.edit.sale,
  }

  const [state, setState] = useState(initState);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const { id, productName, category, quantity, date, description, price, sale } = state;

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFile(file);
    console.log("file " + file.name);
  }
  const handleFileUpload = (e) => {
    e.preventDefault();
    const storageRef = RefS(storage, `images/${file.name}`);

    uploadBytesResumable(storageRef, file).then(() => {
      console.log('Uploaded a blob or file!');
    });
    getDownloadURL(storageRef)
      .then((url) => {
        setUrl(url);
        // console.log("url" + url);
      })
      .catch((error) => {
        switch (error.code) {
          case 'storage/object-not-found':
            break;
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          // ...
          case 'storage/unknown':
            break;
        }
      });
  }
  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
  }

  const handleSubmit = (e) => {
    // console.log(state);
    e.preventDefault();
    var info = {}
    info.id = state.id;
    info.productName = state.productName;
    info.category = state.category;
    info.date = state.date;
    info.description = state.description;
    info.quantity = state.quantity;
    info.price = state.price;
    info.sale = state.sale;

    // console.log(info);

    set(ref(db, 'Product/' + info.id), {
      productName: info.productName,
      category: info.category,
      date: info.date,
      imgUrl: url,
      description: info.description,
      quantity: info.quantity,
      price: info.price,
      sale: info.sale,
    })
      .then(() => { toast.success("Update user successfully!") })
      .catch(() => { toast.error("failed to update user") })
  }

  return (
    <div className="main__addproduct container">
      <form className='mt-4 row'>
        {/* <button className='btn btn-primary mt-3' onClick={() => props.toggleForm()}>Thêm Mới</button> */}
        <div class="mb-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Name</label>
          <input type="text" class="form-control top"
            placeholder=""
            id='name exampleFormControlInput1' name='name'
            value={productName} onChange={handleInputChange}
            defaultValue={props.edit.productName}
          />
        </div>
        <div class="mb-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Category </label>
          <input type="text" class="form-control"
            placeholder=""
            id='category exampleFormControlInput1' name='category'
            value={category} onChange={handleInputChange}
            defaultValue={props.edit.category}
          />
        </div>
        <div class="mb-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            placeholder=""
            id='img exampleFormControlInput1' name='img'
            onChange={handleFileChange}
          />
          <button onClick={handleFileUpload}>Tải lên</button>
          {url && (
            <img src={`${url}`} className="imgUrl" />
          )}
        </div>
        <div class="mb-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Date</label>
          <input type="text" class="form-control"
            placeholder=""
            id='date exampleFormControlInput1' name='date'
            value={date} onChange={handleInputChange}
            defaultValue={props.edit.date}
          />
        </div>
        <div class="mb-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Description</label>
          <input type="text" class="form-control"
            placeholder=""
            id='quantity exampleFormControlInput1' name='quantity'
            value={quantity} onChange={handleInputChange}
          />
        </div>
        <div class="mb-3 col-md-4">
          <label for="exampleFormControlInput1" class="form-label">Price</label>
          <input type="text" class="form-control"
            placeholder="price..."
            id='price exampleFormControlInput1' name='price'
            value={price} onChange={handleInputChange}
            defaultValue={props.edit.price}
          />
        </div>
        <div class="mb-3 col-md-12">
          <label for="exampleFormControlInput1" class="form-label">Sale</label>
          <input type="text" class="form-control"
            placeholder="sale..."
            id='sale exampleFormControlInput1' name='sale'
            value={sale} onChange={handleInputChange}
            defaultValue={props.edit.sale}
          />
        </div>
        <div class="mb-3 col-md-12">
          <label for="exampleFormControlInput1" class="form-label">Description</label>
          <textarea row={2} type="text"  class="form-control"
            placeholder=""
            id='description exampleFormControlInput1' name='description'
            value={description} onChange={handleInputChange}
            defaultValue={props.edit.description}
          />
        </div>
        <button className="btn btn-primary btn__save" type="submit" onClick={handleSubmit}> Save</button>
        {/* <button type="submit" value="Save" onClick={handleSubmit} /> */}
      </form>
      <button className="btn btn-danger btn__cancel" onClick={() => props.handleChangeState()}> Cancel</button>
    </div>
  )
}

export default EditProduct