import React, { useState } from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from '../firebase.confige';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const signup =  async e => {
    e.preventDefault()
    setLoading(true)
    try{
      const userCredentail = await createUserWithEmailAndPassword(auth, email, password)

      // const storageRef = ref(storage, `images/${Date.now() + username}`);
      // const uploadTask = uploadBytesResumable(storageRef,file);
      // uploadTask.on((error) => {
      //   toast.error(error.message);
      // }, () => {
      //   getDownloadURL(uploadTask.snapshot.ref).then (async (downloadURL) => {
        //     await updateProfile(user, {
          //       displayName: username,
          //       photoURL: downloadURL,
          //     })
          
          //   });
          // })
      const user = userCredentail.user;
      await setDoc(doc(db,"users", user.uid), {
        uid: user.uid,
        displayName: username,
        email,
      });

      setLoading(false)
      toast.success("Created account success");
      navigate('/login')
      console.log(user);
    }catch(error) {
      toast.error(error.message);
    }

  }

  // const signup = createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     const user = userCredential.user;
  //     toast.success("Account created");
  //     navigate('/login');
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     // ..
  //   });


  return (
    <section>
      <Container>
        <Row>
          {
            loading ?
              <Col lg='12' className='text-center'><h5>Loading...</h5></Col> :
              <Col lg='6' className='m-auto text-center'>
                <h3 className='fw-bold fs-4 mb-5'>Signup</h3>
                <Form className='auth__form' onSubmit={signup}>
                  <FormGroup className='form__group'>
                    <input type='text' placeholder='Enter username'
                      value={username} onChange={e => setUsername(e.target.value)}
                    >
                    </input>
                  </FormGroup>
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
                  {/* <FormGroup className='form__group'>
                    <input type='file' onChange={e => setFile(e.target.files[0])}
                    ></input>
                  </FormGroup> */}
                  <button type='submit' className="buy__btn auth__btn bg-white  text-dark mb-2  fw-500 text-center">Create account</button>
                  <p>Already have an account?<Link to='/login' className='text-white fw-500'>Login</Link> </p>
                </Form>
              </Col>
          }

        </Row>
      </Container>
    </section>
  )
}

export default Signup