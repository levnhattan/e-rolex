import React from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import '../styles/checkout.css'
import {useSelector}  from 'react-redux';



const Checkout = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  return (
    <Container>
      <Row>
        <Col lg='8'>
          <h6 className='mb-4 fs-3  fw-bold text-center'>Bill Info</h6>
          <Form className='bill__form'>
            <FormGroup className='form__group'>
              <input type="text" placeholder='Enter name' />
            </FormGroup>
            <FormGroup className='form__group'>
              <input type="email" placeholder='Enter email' />
            </FormGroup>
            <FormGroup className='form__group'>
              <input type="number" placeholder='Enter phone' />
            </FormGroup>
            <FormGroup className='form__group'>
              <input type="text" placeholder='Enter address' />
            </FormGroup>
            <FormGroup className='form__group'>
              <input type="text" placeholder='Enter address' />
            </FormGroup>
            <FormGroup className='form__group'>
              <input type="text" placeholder='Enter address' />
            </FormGroup>
          </Form>
        </Col>
        <Col lg='4'>
          <div className='checkout__card'>
            <h6>Total Quantity <span>{totalQuantity}</span></h6>
            <h6>Total <span> ${totalAmount}</span></h6>
            <h6>
              <span>Ship:<br />Free Ship </span>   <span>$0</span>
            </h6>
            <h4>Total Bill: <span>${totalAmount}</span></h4>
            <button className="buy__btn auth__btn w-100 bg-white text-dark  fw-500 text-center">Checkout</button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout