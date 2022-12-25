import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";

const EditProduct = (props) => {

  const initState = {
    id: props.edit.id,
    productName: props.edit.productName,
    category: props.edit.category,
    date: props.edit.date,
    imgUrl: props.edit.imgUrl,
    description: props.edit.description,
    quantity: props.edit.quantity,
    price: props.edit.price,
    sale: props.edit.sale,
  }

  const [state, setState] = useState(initState);
  const { id, productName, category, quantity, date, imgUrl, description, price, sale } = state;


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
    info.imgUrl = state.imgUrl;
    info.description = state.description;
    info.quantity = state.quantity;
    info.price = state.price;
    info.sale = state.sale;

    // console.log(info);

    set(ref(db, 'Product/' + info.id), {
      productName: info.productName,
      category: info.category,
      date: info.date,
      imgUrl: info.imgUrl,
      description: info.description,
      quantity: info.quantity,
      price: info.price,
      sale: info.sale,
    })
      .then(() => { toast.success("Update user successfully!") })
      .catch(() => { toast.error("failed to update user") })


  }

  return (
    <div className="">
      <form onSubmit={handleSubmit} className='mt-4'>
        {/* <button className='btn btn-primary mt-3' onClick={() => props.toggleForm()}>Thêm Mới</button> */}
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Name</label>
          <input type="text" class="form-control"
            placeholder="name product..."
            id='name exampleFormControlInput1' name='name'
            value={productName} onChange={handleInputChange}
            defaultValue={props.edit.productName}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Image</label>
          <input class="form-control"
            placeholder="image product..."
            id='category exampleFormControlInput1' name='category'
            value={imgUrl} onChange={handleInputChange}
            defaultValue={props.edit.imgUrl}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Category </label>
          <input type="text" class="form-control"
            placeholder="category..."
            id='category exampleFormControlInput1' name='category'
            value={category} onChange={handleInputChange}
            defaultValue={props.edit.category}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Date</label>
          <input type="text" class="form-control"
            placeholder="date..."
            id='date exampleFormControlInput1' name='date'
            value={date} onChange={handleInputChange}
            defaultValue={props.edit.date}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Description</label>
          <input type="text" class="form-control"
            placeholder="description..."
            id='description exampleFormControlInput1' name='description'
            value={description} onChange={handleInputChange}
            defaultValue={props.edit.description}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Description</label>
          <input type="text" class="form-control"
            placeholder="quantity..."
            id='quantity exampleFormControlInput1' name='quantity'
            value={quantity} onChange={handleInputChange}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Price</label>
          <input type="text" class="form-control"
            placeholder="price..."
            id='price exampleFormControlInput1' name='price'
            value={price} onChange={handleInputChange}
            defaultValue={props.edit.price}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Sale</label>
          <input type="text" class="form-control"
            placeholder="sale..."
            id='sale exampleFormControlInput1' name='sale'
            value={sale} onChange={handleInputChange}
            defaultValue={props.edit.sale}
          />
        </div>
        <button className="btn btn-primary" type="submit" onClick={handleSubmit}> Save</button>
        {/* <button type="submit" value="Save" onClick={handleSubmit} /> */}
      </form>
      <button className="btn btn-primary" onClick={() => props.handleChangeState()}> Cancel</button>
    </div>
  )
}

export default EditProduct