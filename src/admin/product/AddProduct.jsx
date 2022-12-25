import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";

const initState = {
    productName: '',
    category: '',
    date: '',
    imgUrl: '',
    description: '',
    quantity: '',
    price: '',
    sale: '',
}
const AddProduct = () => {
    const [state, setState] = useState(initState);
    const { productName, category, quantity,  date, imgUrl, description, price, sale } = state;

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //|| !category || !date || !price || !description || !sale
        if (!productName ) {
            toast.error("Please enter input")
        } else {
            const productRef = ref(db, 'Product/');
            const newProduct = push(productRef);
            // console.log(newProduct);
            if (newProduct) {
                set(newProduct, {
                    productName: productName,
                    category: category,
                    date: date,
                    imgUrl: imgUrl,
                    description: description,
                    quantity: quantity,
                    price: price,
                    sale: sale,
                });
                toast.success("Add User Successfully!");

            } else {
                toast.error("Add User Fail!");
            }
        }
        setState({
            productName: '',
            category: '',
            date: '',
            imgUrl: '',
            description: '',
            quantity: '' ,
            price: '',
            sale: '',
        })
    }

    return (
        <form onSubmit={handleSubmit} type="reset" className='mt-4'>
            {/* <button className='btn btn-primary mt-3' onClick={() => props.toggleForm()}>Thêm Mới</button> */}
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input type="text" class="form-control"
                    placeholder="name product..."
                    id='productName exampleFormControlInput1' name='productName'
                    value={productName} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Image</label>
                <input class="form-control"
                    placeholder="image product..."
                    id='category exampleFormControlInput1' name='category'
                    value={imgUrl} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Category </label>
                <input type="text" class="form-control"
                    placeholder="category..."
                    id='category exampleFormControlInput1' name='category'
                    value={category} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Date</label>
                <input type="text" class="form-control"
                    placeholder="date..."
                    id='date exampleFormControlInput1' name='date'
                    value={date} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Description</label>
                <input type="text" class="form-control"
                    placeholder="description..."
                    id='description exampleFormControlInput1' name='description'
                    value={description} onChange={handleInputChange}
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
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Sale</label>
                <input type="text" class="form-control"
                    placeholder="sale..."
                    id='sale exampleFormControlInput1' name='sale'
                    value={sale} onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}> Save</button>
            {/* <button type="submit" value="Save" onClick={handleSubmit} /> */}
        </form>
    )
}

export default AddProduct