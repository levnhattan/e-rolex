import React, { useState, useEffect } from 'react'
import Title from '../components/Title/Title'
import { Container, Row, Col } from 'reactstrap'
import rolexImg from '../assets/images/rolex5.png'
import '../styles/home.css'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Services from '../services/services'
import ProductList from '../components/UI/ProductList'
import products from '../assets/data/products'
import counterImg from '../assets/images/watch-03.jpg'
import Clock from '../components/UI/Clock'
import db from '../firebase.confige';
import { set, get, ref, child, push, update, onValue, remove } from "firebase/database";



const Home = () => {
  const [trending, setTrending] = useState([]);
  const [sales, setSales] = useState([]);
  const [mobile, setMoblie] = useState([]);
  const [wireles, setWireles] = useState([]);
  const [popular, setPopular] = useState([]);
  // const [products, setProduct] = useState([]);

  // useEffect(() => {
  //   const productRef = ref(db, 'Product/');
  //   onValue(productRef, (snapshot) => {
  //     var tempData = [];
  //     snapshot.forEach((childSnapshot) => {
  //       var key = childSnapshot.key;
  //       var category = childSnapshot.val().category;
  //       var productName = childSnapshot.val().productName;
  //       var quantity = childSnapshot.val().quantity;
  //       var date = childSnapshot.val().date;
  //       var description = childSnapshot.val().description;
  //       var imgUrl = childSnapshot.val().imgUrl;
  //       var price = childSnapshot.val().price;
  //       var sale = childSnapshot.val().sale;
  //       tempData.push({
  //         id: key,
  //         productName: productName,
  //         category: category,
  //         quantity: quantity,
  //         date: date,
  //         imgUrl: imgUrl,
  //         description: description,
  //         price: price,
  //         sale: sale,
  //       })
  //       setProduct([...tempData])
  //     })
  //   })
  // }, [])
  const year = new Date().getFullYear();
  useEffect(() => {
    const filterTrending = products.filter(product => product.category === 'rolex');
    const filterSales = products.filter(product => product.category === 'sofa');
    const filterMobile = products.filter(product => product.category === 'mobile');
    const filterWireless = products.filter(product => product.category === 'wireless');
    const filterPopular = products.filter(product => product.category === 'watch');


    setTrending(filterTrending)
    setSales(filterSales)
    setMoblie(filterMobile)
    setWireles(filterWireless)
    setPopular(filterPopular)
  }, []);

  return (
    <Title title={'Home'}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="hero__content">
                <p className="hero_subtitle">Trending product in {year} </p>
                <h2>Make Your</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas placeat, sapiente ducimus qui sequi, consectetur ad quas non quia beatae ipsa modi dolor pariatur ex fugiat!</p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to='/shop'>SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="hero__img">
                {/* <img src={rolexImg} alt="" width="100%" height="100%" /> */}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className="section__title">
                Trending Products
              </h2>
            </Col>
            <ProductList data={trending} />
          </Row>
        </Container>
      </section>
      {/* <section className="best__sales">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className="section__title">
                Best Sales
              </h2>
            </Col>
            <ProductList data={sales}></ProductList>
          </Row>
        </Container>
      </section> */}
      <section className="timer_counter">
        <Container>
          <Row >
            <Col lg='6' md='6'>
              <div className="clock__top-centent">
                <h4 className='text-white fs-6 mb-2'>Limited Offers</h4>
                <h3 className='text-white fs-5 mb-3'>Quanity</h3>
              </div>
              <Clock />
              <motion.button whileTap={{ scale: 1.2 }} className="buy__btn store___btn">
                <Link to='/shop'>Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg='6' md='6' className='text-end'>
              {/* <img src={counterImg} alt="" /> */}
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className="section__title">
                New Arrivals
              </h2>
            </Col>
            <ProductList data={mobile} />
            <ProductList data={wireles} />
          </Row>
        </Container>
      </section> */}
      <section className="popular__category">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
              <h2 className="section__title">
                Popular in category
              </h2>
            </Col>
            <ProductList data={popular} />
          </Row>
        </Container>
      </section>
    </Title>
  )
}

export default Home