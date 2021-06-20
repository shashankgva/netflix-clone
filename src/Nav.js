import React, { useEffect, useState } from 'react';
import './Nav.css';

function Nav() {
  const [showBg, setShowBg] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        setShowBg(true);
      } else {
        setShowBg(false);
      }
    });
    return () => {
      window.removeEventListener('scroll');
    };
  }, []);
  return (
    <div className={`nav ${showBg && 'nav__black'}`}>
      <img
        src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
        alt="Netflix Logo"
        className="nav__logo"
      />
      <img
        src="https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png"
        alt=""
        className="nav__avatar"
      />
    </div>
  );
}

export default Nav;
