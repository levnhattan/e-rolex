import React, { useState } from 'react'
import CommonSection from '../components/UI/CommonSection'
import Title from '../components/Title/Title'
import { Container, Row, Col } from 'reactstrap'
import '../styles/shop.css'
import products from '../assets/data/products'
import ProductList from '../components/UI/ProductList'

const Shop = () => {
  const [productsData, setProductsData] = useState(products);

  const handleFilter = e => {
    const value = e.target.value;
    if (value === 'rolex') {
      const filterProducts = products.filter(product => product.category === 'rolex');
      setProductsData(filterProducts);
    }
    if (value === 'watch') {
      const filterProducts = products.filter(product => product.category === 'watch');
      setProductsData(filterProducts);
    }
  }

  const handleSearch = e => {
    const searchItem = e.target.value;

    const searchProducts = products.filter(product =>
      product.productName.toLowerCase().includes(searchItem.toLowerCase())
    );
    setProductsData(searchProducts);
  }
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option>Filer Category</option>
                  <option value="rolex">Rolex</option>
                  <option value="watch">Watch</option>
                </select>
              </div>
            </Col>
            <Col lg='3' md='3'>
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="asc">Asc</option>
                  <option value="des">Des</option>
                </select>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className="search__box" >
                <input type="text" placeholder="Search..." onChange={handleSearch} />
                <span><i className="ri-search-line"></i></span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row>
            {
              productsData.length === 0 ? <h1 className='text-center fs-4'> No products found </h1> : <ProductList data={productsData} />
            }
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Shop