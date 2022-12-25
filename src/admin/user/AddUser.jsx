import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";

const initState = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
}

const AddUser = (props) => {
    const [state, setState] = useState(initState);
    const { name, email,password, phone, address, role } = state;

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !email || !password || !phone || !address || !role) {
            toast.error("Please enter input")
        } else {
            const userRef = ref(db, 'User/');
            const newUser = push(userRef);
            // console.log(newUser);
            if (newUser) {
                set(newUser, {
                    name: state.name,
                    email: state.email,
                    password: state.password,
                    phone: state.phone,
                    address: state.address,
                    role: state.role,
                });
                toast.success("Add User Successfully!");

            } else {
                toast.error("Add User Fail!");
            }
        }
        setState({
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            role: '',
        })
    }

    return (
        <form onSubmit={handleSubmit} type="reset" className='mt-4'>
          {/* <button className='btn btn-primary mt-3' onClick={() => props.toggleForm()}>Thêm Mới</button> */}
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Name</label>
                <input type="text" class="form-control"
                    placeholder="your name..."
                    id='name exampleFormControlInput1' name='name'
                    value={name} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control"
                    placeholder="your email..."
                    id='email exampleFormControlInput1' name='email'
                    value={email} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Email</label>
                <input type="email" class="form-control"
                    placeholder="your email..."
                    id='password exampleFormControlInput1' name='password'
                    value={password} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Phone </label>
                <input type="text" class="form-control"
                    placeholder="your phone..."
                    id='phone exampleFormControlInput1' name='phone'
                    value={phone} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Address</label>
                <input type="text" class="form-control"
                    placeholder="your address"
                    id='address exampleFormControlInput1' name='address'
                    value={address} onChange={handleInputChange}
                />
            </div>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Role</label>
                <input type="text" class="form-control"
                    placeholder="your address"
                    id='role exampleFormControlInput1' name='role'
                    value={role} onChange={handleInputChange}
                />
            </div>
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}> Save</button>
            {/* <button type="submit" value="Save" onClick={handleSubmit} /> */}
        </form>
    )
}

export default AddUser