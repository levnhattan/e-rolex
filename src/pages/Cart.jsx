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
  
  const List = ({ item }) => {
    const dispatch = useDispatch();
    const addCart = () => {
      dispatch(cartActions.addItem({
          id: item.id,
          productName: item.productName,
          price: item.price,
          imgUrl: item.imgUrl
        })
      )
    };
    const deleteProduct = () => {
      dispatch(cartActions.deleteItem(item.id))
    }
    const removeProduct = () => {
      dispatch(cartActions.removeItem(item.id))
    }
    return (
      <tr >
        <td> <img src={item.imgUrl} alt="" /></td>
        <td>{item.productName}</td>
        <td>{item.price} 000 VNĐ</td>
        <td><i class="ri-add-line" onClick={addCart}></i>{item.quantity}<i class="ri-subtract-line" onClick={deleteProduct}></i></td>
        <td><motion.i
          whileTap={{ scale: 1.2 }}
          className="ri-delete-bin-line"
          onClick={removeProduct}
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
                          <th>Name Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Delete</th>
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
                  )
              }

            </Col>
            <Col lg='3'>
              <div>
                <h4 className='d-flex align-items-center justity-content-between '>
                  Total
                  <span className='fs-4 fw-bold'> {totalAmount} 000  VNĐ</span>
                </h4>
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