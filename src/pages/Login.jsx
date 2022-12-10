import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth, storage, db } from '../firebase.confige';
import { toast } from 'react-toastify'
import imglogin from '../assets/images/imglogin.png';
import fblogo from '../assets/images/fb_logo.png';
import gmlogo from '../assets/images/gmail_logo.png';
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
          <Col lg='6'>
          <h1>Login</h1>
          <div className="imglogin">
              <img src={imglogin} alt="imglogin" />
            </div>
          </Col>
          <Col lg='6' className='text-center'>
            <h3 className='fw-bold fs-4'>Do you already have an account</h3>
            {
              loading ?
                <Col lg='12' className='text-center'><h5>Loading...</h5></Col> :
                <Form className='auth__form' onSubmit={login}>
                  <FormGroup className='form__group'>
                    <input type='email' placeholder='Enter email...'
                      value={email} onChange={e => setEmail(e.target.value)}
                    >
                    </input>
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input type='password' placeholder='Enter password...'
                      value={password} onChange={e => setPassword(e.target.value)}
                    ></input>
                  </FormGroup>
                  <button type='submit' className="buy__btn auth__btn bg-drak  text-dark mb-2 text-white fw-500 text-center">Login</button>
                  <p className=''>Don't have an account?<Link to='/signup' className='fw-500'>Creact account</Link> </p>
                </Form>
            }
            <div class="block-content">
                            <div class="actions-toolbar social-btn social-btn-actions-toolbar facebook-login">
                    <a class="btn btn-block btn-social btn-facebook">
                        <div class="fa fa-facebook">
                          <img src={fblogo} alt="Logo" />
                        </div>
                    </a>
                </div>
                            <div class="actions-toolbar social-btn social-btn-actions-toolbar google-login">
                    <a class="btn btn-block btn-social btn-google">
                        <div class="fa fa-google">
                          <img src={gmlogo} alt="Logo" />
                        </div>
                    </a>
                </div>
                    </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login