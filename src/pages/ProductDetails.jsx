import React, { useState, useRef } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom';
import products from '../assets/data/products';
import Title from '../components/UI/CommonSection'
import CommonSection from '../components/UI/CommonSection';
import '../styles/product-details.css'
import { motion } from 'framer-motion'
import ProductList from '../components/UI/ProductList'
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ProductDetails = () => {

  const [tab, setTab] = useState('desc');
  const [rating, setRating] = useState(null);
  const { id } = useParams();
  const reviewUser = useRef('');
  const reviewMess = useRef('');
  const dispatch = useDispatch()

  const product = products.find((item) => item.id === id)
  const { imgUrl,
    productName,
    price,
    avgRating,
    reviews,
    description,
    shortDesc,
    category } = product

  const relatedProducts = products.filter((item) => item.category === category);
  const handlerSubmit = e => {
    e.preventDefault();
    const reviewUserName = reviewUser.current.value;
    const reviewUserMess = reviewMess.current.value;

    // console.log(reviewUserName, reviewUserMess, rating);
    const receiveReview = {
      userName: reviewUserName,
      mess: reviewUserMess,
      rating,
    }
    // console.log(receiveReview);
    toast.success('Successfully review');

  }
  const addCart = () => {
    dispatch(cartActions.addItem({
      id,
      imgUrl: imgUrl,
      productName,
      price,
    }))
    toast.success('Successfully added product');

  }
  return (
    <div>
      <section className='pt-0'>
        <Container>
          <Row>
            <Col lg='6'>
              <img src={imgUrl} alt=""  />
            </Col>
            <Col lg='6'>
              <div className="product__details">
                <h2>{productName}</h2>
                <div className="product__rating d-flex align-items-center gap-5 mb-3">
                  <div>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                    <span><i className="ri-star-s-fill"></i></span>
                  </div>
                  <p>(<span>{avgRating} </span>ratings)</p>
                </div>
                <div className='d-flex align-items-center gap-5'>
                  <span className='product__price'>{price} 000 VNĐ</span>
                  <span>Category: {category}</span>
                </div>

                <p className='mt-3'>{shortDesc}</p>

                <motion.button
                  whileTap={{ scale: 1.2 }}
                  className="buy__btn"
                  onClick={addCart}
                >
                  Add to cart
                </motion.button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              <div className="tab__wrapper d-flex align-items-center gap-5">
                <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`}
                  onClick={() => setTab(('desc'))}
                >
                  Description
                </h6>
                <h6 className={`${tab === 'rev' ? 'active__tab' : ''}`}
                  onClick={() => setTab(('rev'))}
                >
                  Review ({reviews.length})
                </h6>
              </div>
              {
                tab === 'desc' ? (
                  <div className="tab__content mt-5">
                    <p>{description}</p>
                  </div>
                ) : (
                  <div className='product__review'>
                    <div className="review__wrapper mt-5">
                      <ul>
                        {
                          reviews.map((review, index) => (
                            <li key={index} className='mb-4'>
                              <h6>LVNT</h6>
                              <span>{review.rating} (avg)</span>
                              <p>{review.text}</p>
                            </li>
                          ))
                        }
                      </ul>
                      <div className="review__form">
                        <h4></h4>
                        <form action='' onSubmit={handlerSubmit}>
                          <div className="form__group">
                            <input type="text" placeholder='enter name' ref={reviewUser} />
                          </div>
                          <div className="form__group d-flex align-items-center gap-5" >
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(1)}>1
                              <i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(2)}>2
                              <i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(3)}>3
                              <i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(4)}>4
                              <i className="ri-star-s-fill"></i>
                            </motion.span>
                            <motion.span whileTap={{ scale: 1.2 }} onClick={() => setRating(5)}>5
                              <i className="ri-star-s-fill"></i>
                            </motion.span>
                          </div>
                          <div className="form__group">
                            <textarea row={4} type="text" placeholder='Review' ref={reviewMess} />
                          </div>
                          <motion.button whileTap={{ scale: 1.2 }} className="buy__btn" type='submit'>Submit</motion.button>
                        </form>
                      </div>
                    </div>
                  </div>
                ) 
              
              }
            </Col>
            <Col lg='12'>
              <h2 className="related__title text-center mb-5 mt-5">You might also like</h2>
            </Col>
            <ProductList data={relatedProducts} />
          </Row>
        </Container>
      </section>
    </div>
    // <Title>
    // <CommonSection/>
    // </Title>
  )
}

export default ProductDetails