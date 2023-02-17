import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, onAuthStateChanged, getAuth } from "firebase/auth";
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";
import { auth } from '../firebase.confige';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { db } from '../firebase.confige';
import '../styles/signup.css'

const initState = {
  name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  role: '',
}

const Signup = () => {
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState(initState);

  const { name, email, password, phone, address, role } = state;
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({ ...state, [name]: value });
    // console.log(state);
  }

  const signup = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredentail = await createUserWithEmailAndPassword(auth,  email, password)
      const user = userCredentail.user;
      // console.log(user.email);
      const userRef = ref(db, 'User/');
      const newUser = push(userRef);
      
      set(newUser, {
        name: state.name,
        email: state.email,
        password: state.password,
        phone: state.phone,
        address: state.address,
        role: state.role,
      });
      console.log("newUser "+newUser);
      setLoading(false)
      toast.success("Created account success");
      navigate('/login')
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <section>
      <Container>
        <Row>
          {
            loading ?
              <Col lg='12' className='text-center'><h5>Loading...</h5></Col> :
              <Col lg='6' className='m-auto text-center signup-form'>
                <h3 className='fw-bold fs-4 mb-5'>Signup</h3>
                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='form__group'>
                    <input type='text' placeholder='Enter username' id="name" name="name"
                      value={name} onChange={handleInputChange}
                    >
                    </input>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type='email' placeholder='Enter email' id="email" name="email"
                      value={email} onChange={handleInputChange}
                    >
                    </input>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type='password' placeholder='Enter password' id="password" name="password"
                      value={password} onChange={handleInputChange}
                    ></input>
                  </FormGroup>
                  {/* <FormGroup className='form__group'>
                    <input type='file' onChange={e => setFile(e.target.files[0])}
                    ></input>
                  </FormGroup> */}
                  <button type='submit' className="buy__btn auth__btn bg-white  text-dark mb-2  fw-500 text-center">Create account</button>
                  <p>Already have an account?<Link to='/login' className='text-info fw-500'>Login</Link> </p>
                </Form>
              </Col>
          }
        </Row>
      </Container>
    </section>
  )
}

export default Signup