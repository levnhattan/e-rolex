import React from 'react';
import './footer.css';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/eco-logo.png';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='4' className='mb-4'>
            <div className="logo">
              <div>
                <h1 className='text-white'>Rolex</h1>
              </div>
            </div>
            <p className="footer__text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ipsa eum, dignissimos sed inventore consequuntur iure laborum, libero nesciunt iste architecto? Sapiente dolore dignissimos dicta officiis omnis enim maiores blanditiis.
            </p>
          </Col>
          <Col lg='3' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Top catelogy</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Rolex</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Casio</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Watch</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Smart</Link>
                </ListGroupItem>
              </ListGroup>

            </div>
          </Col>
          <Col lg='2' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Useful Links</h4>
              <ListGroup className='mb-3'>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Shop</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Cart</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>About</Link>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='3' className='mb-4'>
            <div className="footer__quick-links">
              <h4 className="quick__links-title">Contact</h4>
              <ListGroup className='footer__contact'>
                <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                  <span><i className="ri-map-pin-line"></i></span>
                  <p>132 Quang Trung, Đà Nẵng, Việt Nam</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                  <span><i className="ri-phone-line"></i></span>
                  <p>+8498987879</p>
                </ListGroupItem>
                <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2' >
                  <span><i className="ri-mail-line"></i></span>
                  <p>levnhattan@gmail.com</p>
                </ListGroupItem>
              </ListGroup>
            </div>
          </Col>
          <Col lg='12' className='text-center '>
            <p className="footer__copyright">CopyRight {year} @LVNT</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer