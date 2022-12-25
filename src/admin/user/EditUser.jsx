import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";



const EditUser = (props) => {
    const initState = {
        id: props.editUser.id,
        name: props.editUser.name,
        email: props.editUser.email,
        password: props.editUser.password,
        phone: props.editUser.phone,
        address: props.editUser.address,
        role: props.editUser.role,
    }
    const [state, setState] = useState(initState);

    const { id, name, email,password, phone, address ,role} = state;

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
        info.name = state.name;
        info.email = state.email;
        info.password= state.password;
        info.phone = state.phone;
        info.address = state.address;
        info.role = state.role;
        // console.log(info);
        set(ref(db, 'User/' + info.id), {
            name: info.name,
            email: info.email,
            password: info.password,
            phone: info.phone,
            address: info.address,
            role: info.role,
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
                        placeholder="your name..."
                        id='name exampleFormControlInput1' name='name'
                        value={name} onChange={handleInputChange}
                        defaultValue={props.editUser.name}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Email</label>
                    <input type="email" class="form-control"
                        placeholder="your email..."
                        id='email exampleFormControlInput1' name='email'
                        value={email} onChange={handleInputChange}
                        defaultValue={props.editUser.email}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Password</label>
                    <input type="email" class="form-control"
                        placeholder="your email..."
                        id='password exampleFormControlInput1' name='password'
                        value={password} onChange={handleInputChange}
                        defaultValue={props.editUser.email}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Phone </label>
                    <input type="text" class="form-control"
                        placeholder="your phone..."
                        id='phone exampleFormControlInput1' name='phone'
                        value={phone} onChange={handleInputChange}
                        defaultValue={props.editUser.phone}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Address</label>
                    <input type="text" class="form-control"
                        placeholder="your address"
                        id='address exampleFormControlInput1' name='address'
                        value={address} onChange={handleInputChange}
                        defaultValue={props.editUser.address}
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Role</label>
                    <input type="text" class="form-control"
                        placeholder="your address"
                        id='role exampleFormControlInput1' name='role'
                        value={role} onChange={handleInputChange}
                        defaultValue={props.editUser.role}
                    />
                </div>
                <button className="btn btn-primary" type="submit" onClick={handleSubmit}> Save</button>
                {/* <button type="submit" value="Save" onClick={handleSubmit} /> */}
            </form>
            <button className="btn btn-primary" onClick={() => props.handleChangeState()}> Cancel</button>
        </div>

    )
}

export default EditUser