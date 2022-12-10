import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import '../styles/cart.css';
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';


const Cart = () => {
  const cartItem = useSelector(state => state.cart.cartItem);
  const totalAmount = useSelector(state => state.cart.totalAmount);

  const Tr = ({ item }) => {
    const dispatch = useDispatch();

    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id))
    }
    return (
      <tr >
        <td> <img src={item.imgUrl} alt="" /></td>
        <td>{item.productName}</td>
        <td>{item.price}</td>
        <td className='d-flex justify-items-center gap-2 quantity' height="67px"><i class="ri-add-line"></i>{item.quantity}<i class="ri-subtract-line"></i></td>
        <td><motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-delete-bin-line"
          onClick={deleteProduct}
        ></motion.i> </td>
      </tr>
    )
  }

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItem.length === 0 ?
                  <h2
                    className='fs-4 text-center'
                  >No items</h2> : (
                    <table className='table bordered'>
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Title</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          cartItem.map((item, index) => (
                            <Tr item={item} key={index}></Tr>
                          ))
                        }
                      </tbody>
                    </table>
                  )
              }

            </Col>
            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justity-content-between '>
                  Total
                  <span className='fs-4 fw-bold'>${totalAmount}</span>
                </h6>
              </div>
              <p className='fs-4 mt-4'> Free Ship</p>
              <div>
              <button className="buy__btn w-100">
                <Link to='/checkout' >Checkout</Link>
              </button>
              <button className="buy__btn w-100 mt-3">
                <Link to='/shop' >Return Shop</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Cart