import React, {useState} from 'react'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import '../styles/checkout.css'
import { useSelector, useDispatch } from 'react-redux';


const Checkout = () => {
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const cartItem = useSelector(state => state.cart.cartItem);

  const totalAmount = useSelector(state => state.cart.totalAmount);

  const List = ({ item, index}) => {
    return (
      <tr >
        {/* <td>{index}</td> */}
        <td> <img src={item.imgUrl} alt="" /></td>
        <td>{item.productName}</td>
        <td>{item.price} 000 VNĐ</td>
        <td>{item.quantity}</td>

      </tr>
    )
  }
  return (
    <Container>
      <Row>
        <Col lg='8'>
          <h6 className='mb-4 fs-3  fw-bold text-center'>Bill Info</h6>
          <Form className='bill__form row '>
            <FormGroup className='form__group col-6'>
              <label class="form-label">Full Name</label>
              <input type="text" class="form-control fs-5" />
            </FormGroup>
            <FormGroup className='form__group col-6'>
              <label class="form-label">Phone Number</label>
              <input type="email" class="form-control fs-5" />
            </FormGroup>
            <FormGroup className='form__group'>
              <label class="form-label">Address</label>
              <input type="text" class="form-control fs-5" />
            </FormGroup>
            <FormGroup className='form__group'>
              <label class="form-label">Date</label>
              <input type="date" class="form-control fs-5" />
            </FormGroup>
            <Col lg='12'>
              {
                    <table className='table bordered'>
                      <thead>
                        <tr>
                          {/* <th>No.</th> */}
                          <th>Image</th>
                          <th>Name Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartItem.map((item, index) => (
                            <List item={item} key={index}></List>
                          ))
                        }
                      </tbody>
                    </table>
              }
            </Col>
          </Form>
        </Col>
        <Col lg='4'>
          <div className='checkout__card'>
            <h6>Total Quantity: <span>{totalQuantity}</span></h6>
            <h6>Total: <span> {totalAmount} 000 VNĐ</span></h6>
            <h6>
              <span>Free Ship </span>   <span>0 VNĐ</span>
            </h6>
            <h4>Total Bill: <span>{totalAmount} 000 VNĐ</span></h4>
            <button className="buy__btn auth__btn w-100 bg-white text-dark  fw-500 text-center">Checkout</button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Checkout