import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../firebase.confige'
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import './style.css';


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

    const { id, name, email, password, phone, address, role } = state;

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({ ...state, [name]: value });
    }

    const handleSubmit = (e) => {
        // console.log(state);
        e.preventDefault();
        var info = {}
        const auth = getAuth();
        const user = auth.currentUser;
        info.id = state.id;
        info.name = state.name;
        info.email = state.email;
        info.password = state.password;
        info.phone = state.phone;
        info.address = state.address;
        info.role = state.role;
        // console.log(info);

        // updateEmail(auth.currentUser, info.email);
        updatePassword(user, info.password);

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
            <form onSubmit={handleSubmit} className='mt-4 main__adduser'>
                <div className="row">
                    <div class="mb-3 col-md-6" >
                        <label for="exampleFormControlInput1" class="form-label lable__change">Name</label>
                        <input type="text" class="form-control input__change"
                            placeholder="your name..."
                            id='name exampleFormControlInput1' name='name'
                            value={name} onChange={handleInputChange}
                            defaultValue={props.editUser.name}
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="exampleFormControlInput1" class="form-label lable__change">Email</label>
                        <input type="email" class="form-control input__change"
                            placeholder="your email..."
                            id='email exampleFormControlInput1' name='email'
                            value={email} onChange={handleInputChange}
                            defaultValue={props.editUser.email}
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="exampleFormControlInput1" class="form-label lable__change">Password</label>
                        <input type="email" class="form-control input__change"
                            placeholder="your email..."
                            id='password exampleFormControlInput1' name='password'
                            value={password} onChange={handleInputChange}
                            defaultValue={props.editUser.email}
                        />
                    </div>
                    <div class="mb-3 col-md-6">
                        <label for="exampleFormControlInput1" class="form-label lable__change">Phone </label>
                        <input type="text" class="form-control input__change"
                            placeholder="your phone..."
                            id='phone exampleFormControlInput1' name='phone'
                            value={phone} onChange={handleInputChange}
                            defaultValue={props.editUser.phone}
                        />
                    </div>
                    <div class="mb-3 address" >
                        <label for="exampleFormControlInput1" class="form-label lable__change">Address</label>
                        <input type="text" class="form-control"
                            placeholder="your address"
                            id='address exampleFormControlInput1' name='address'
                            value={address} onChange={handleInputChange}
                            defaultValue={props.editUser.address}
                        />
                    </div>
                    {/* <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label">Role</label>
                    <input type="text" class="form-control"
                        placeholder="your address"
                        id='role exampleFormControlInput1' name='role'
                        value={role} onChange={handleInputChange}
                        defaultValue={props.editUser.role}
                    />
                </div> */}
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label lable__role">Role</label>
                        <select class="form-select role" aria-label="Default select example"
                            onChange={handleInputChange} id="role" name="role" value={role}
                            defaultValue={props.editUser.role}
                        >
                            <option selected>-- chose role -- </option>
                            <option >Admin</option>
                            <option >Staff</option>
                            <option>User</option>
                        </select>
                    </div> 
                    <button className="btn btn-primary btn__edit" type="submit" onClick={handleSubmit}> Save</button>
                    {/* <button type="submit" value="Save" 
                    onClick={handleSubmit} /> */}
                    <button className="btn btn-primary btn__edit" onClick={() => props.handleChangeState()}> Cancel</button>
                </div>
                {/* <button className='btn btn-primary mt-3' onClick={() => props.toggleForm()}>Thêm Mới</button> */}
                
            </form>
        </div>

    )
}

export default EditUser