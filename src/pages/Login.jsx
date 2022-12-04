import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, storage, db } from '../firebase.confige';
import { toast } from 'react-toastify'

import '../styles/login.css'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const login = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      setLoading(false)
      toast.success("Login success");
      navigate('/home')
    } catch (error) {
      toast.error(error.message);
      setLoading(false)

    }
  }
  return (
    <section>
      <Container>
        <Row>
          <Col lg='6' className='m-auto text-center'>
            <h3 className='fw-bold fs-4'>Login</h3>
            {
              loading ?
                <Col lg='12' className='text-center'><h5>Loading...</h5></Col> :
                <Form className='auth__form' onSubmit={login}>
                  <FormGroup className='form__group'>
                    <input type='email' placeholder='Enter email'
                      value={email} onChange={e => setEmail(e.target.value)}
                    >
                    </input>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type='password' placeholder='Enter password'
                      value={password} onChange={e => setPassword(e.target.value)}
                    ></input>
                  </FormGroup>
                  <button type='submit' className="buy__btn auth__btn bg-white  text-dark mb-2  fw-500 text-center">Login</button>
                  <p>Don't have an account?<Link to='/signup' className='text-white fw-500'>Creact account</Link> </p>
                </Form>
            }
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login