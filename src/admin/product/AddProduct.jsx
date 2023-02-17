import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import { ref as RefS, uploadBytesResumable, getDownloadURL, uploadBytes } from 'firebase/storage';
import './style.css';

const initState = {
    productName: '',
    category: '',
    date: '',
    description: '',
    quantity: '',
    price: '',
    sale: '',
}
const AddProduct = () => {
    const [state, setState] = useState(initState);
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const { productName, category, quantity, date, description, price, sale } = state;

    const handleFileChange = e => {
        const file = e.target.files[0];
        setFile(file);
        console.log("file " + file.name);
    }
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
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
                console.log("url" + url);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        //|| !category || !date || !price || !description || !sale
        // handleFileUpload();
        if (!productName || !category || !date || !price || !description || !sale) {
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
                    imgUrl: url,
                    description: description,
                    quantity: quantity,
                    price: price,
                    sale: sale,
                });
                toast.success("Add User Successfully!");
            } else {
                toast.error("Add User Fail!");
            }
            console.log(newProduct);
        }
        setState({
            productName: '',
            category: '',
            date: '',
            description: '',
            quantity: '',
            price: '',
            sale: '',
        })
        setFile("");
    }

    return (
        <form className='mt-4 main__addproduct container-fluid'>
            <div className="row">
                {/* <button className='btn btn-primary mt-3' onClick={() => props.toggleForm()}>Thêm Mới</button> */}
                <div className="mb-3 col-md-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label ">Name</label>
                    <input type="text" className="form-control top"
                        placeholder=" "
                        id='productName exampleFormControlInput1' name='productName'
                        value={productName} onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Category </label>
                    <input type="text" className="form-control"
                        placeholder=""
                        id='category exampleFormControlInput1' name='category'
                        value={category} onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Image</label>
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
                <div className="mb-3 col-md-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Date</label>
                    <input type="date" className="form-control"
                        placeholder="date..."
                        id='date exampleFormControlInput1' name='date'
                        value={date} onChange={handleInputChange}
                    />
                </div>
               
                <div className="mb-3 col-md-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Quantity</label>
                    <input type="text" className="form-control"
                        placeholder=""
                        id='quantity exampleFormControlInput1' name='quantity'
                        value={quantity} onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3 col-md-4">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Price</label>
                    <input type="text" className="form-control"
                        placeholder=""
                        id='price exampleFormControlInput1' name='price'
                        value={price} onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Sale</label>
                    <input type="text" className="form-control"
                        placeholder=""
                        id='sale exampleFormControlInput1' name='sale'
                        value={sale} onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Description</label>
                    <textarea row={2} type="text"  className="form-control"
                        placeholder=""
                        id='description exampleFormControlInput1' name='description'
                        value={description} onChange={handleInputChange}
                    />
                </div>
                <button className="btn btn-primary btn__save" type="submit" onClick={handleSubmit}> Save</button>
                {/* <button type="submit" value="Save" onClick={handleSubmit} /> */}
            </div>
        </form>
    )
}

export default AddProduct