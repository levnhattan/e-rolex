import React, { useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import './header.css'
import { motion } from 'framer-motion'
import logo from '../../assets/images/eco-logo.png'
import userIcon from '../../assets/images/user-icon.png'
import { Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';


const nav__links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
  {
    path: 'about',
    display: 'About'
  },
]

const Header = () => {
  const headerRef = useRef();
  const menuRef = useRef();
  const totalQuantity = useSelector(state => state.cart.totalQuantity);

  const sticky = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add('sticky__header');
      } else {
        headerRef.current.classList.remove('sticky__header');
      }
    });
  };

  useEffect(() => {
    sticky();

    return () =>
      window.removeEventListener('scroll', sticky);
  });
  const menuTogge = () => menuRef.current.classList('active__menu')
  const navigete = useNavigate()
  const navigateToCart = () => {
    navigete('/cart')
  }
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="Logo" />
              <div>
                <h1>Rolex</h1>
                {/* <p>Since 2022</p> */}
              </div>
            </div>
            <div className="navigation" ref={menuRef} onClick={menuTogge}>
              <ul className="menu">
                {
                  nav__links.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass =>
                          navClass.isActive ? 'nav__active' : 'null'
                        )}
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                }
              </ul>
            </div>
            <div className="nav__icons">

              <span className='fav__icon'>
                <i class="ri-heart-line"></i>
                <span className='badge'>1</span>
              </span>
              <span className='cart__icon' onClick={navigateToCart}>
                <i class="ri-shopping-bag-line"></i>
                <span className='badge'>{totalQuantity}</span>
              </span>
              <span><motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" /></span>
              <div className="mobile__menu" onClick={menuTogge}>
                <span><i class="ri-menu-line"></i></span>
              </div>

            </div>
          </div>
        </Row>
      </Container>
    </header>
  )
}

export default Header