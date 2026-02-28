import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={"navbar glass " + (scrolled ? 'scrolled' : '')}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Link to="/" className="logo">THE<span>VACE</span></Link>
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Ana Sayfa</Link></li>
          <li><a href="#products" className="nav-link">Ürünler</a></li>
        </ul>
        <div className="nav-actions" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/cart" className="cart-icon" style={{ position: 'relative', fontSize: '1.6rem', textDecoration: 'none' }}>
            🛒 <span className="cart-count" style={{ position: 'absolute', top: '-10px', right: '-12px', background: 'var(--accent)', color: 'white', fontSize: '0.7rem', padding: '2px 7px', borderRadius: '50px', fontWeight: '900' }}>{totalItems}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;