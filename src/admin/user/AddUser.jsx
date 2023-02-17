import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db, auth } from '../../firebase.confige'

import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";
import './style.css';

const initState = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: '',
}

const AddUser = () => {
    const [state, setState] = useState(initState);
    const { name, email, password, phone, address, role } = state;

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
        // console.log(state);
    }

    const handleSubmit = async (e) => {
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
                const userCredentail = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredentail.user;

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
        <form onSubmit={handleSubmit} type="reset" className='mt-4 main__adduser'>
            <div className="row">
                <div class="mb-3 col-md-6 ">
                    <label for="exampleFormControlInput1" class="form-label lable__change">Name</label>
                    <input type="text" class="form-control input__change"
                        placeholder="your name..."
                        id='name exampleFormControlInput1' name='name'
                        value={name} onChange={handleInputChange}
                    />
                </div>
                <div class="mb-3 col-md-6">
                    <label for="exampleFormControlInput1" class="form-label lable__change">Email</label>
                    <input type="email" class="form-control input__change"
                        placeholder="your email..."
                        id='email exampleFormControlInput1' name='email'
                        value={email} onChange={handleInputChange}
                    />
                </div>
                <div class="mb-3 col-md-6">
                    <label for="exampleFormControlInput1" class="form-label lable__change">Password</label>
                    <input type="password" class="form-control input__change"
                        placeholder="your password..."
                        id='password exampleFormControlInput1' name='password'
                        value={password} onChange={handleInputChange}
                    />
                </div>
                <div class="mb-3 col-md-6">
                    <label for="exampleFormControlInput1" class="form-label lable__change">Phone </label>
                    <input type="text" class="form-control input__change"
                        placeholder="your phone..."
                        id='phone exampleFormControlInput1' name='phone'
                        value={phone} onChange={handleInputChange}
                    />
                </div>
                <div class="mb-3 address">
                    <label for="exampleFormControlInput1" class="form-label">Address</label>
                    <input type="text" class="form-control"
                        placeholder="your address"
                        id='address exampleFormControlInput1' name='address'
                        value={address} onChange={handleInputChange}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label lable__role">Role</label>
                    <select class="form-select role" aria-label="Default select example" onChange={handleInputChange} id="role" name="role" value={role}>
                        <option selected>-- chose role -- </option>
                        <option >Admin</option>
                        <option >Staff</option>
                        <option>User</option>
                    </select>
                </div>
                <button className="btn btn-primary btn__save" type="submit" onClick={handleSubmit}> Save</button>
            </div>

        </form>
    )
}

export default AddUser