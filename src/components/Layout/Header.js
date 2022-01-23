import React from 'react';
import {NavLink} from "react-router-dom";
import HeaderIcons from "./HeaderIcons";
import headerLogoSrc from "../../assets/img/header-logo.png";

function Header() {
  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">
              <img src={headerLogoSrc} alt="Bosa Noga" />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link">Главная</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link">О магазине</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
                </li>
              </ul>
              <div>
                <HeaderIcons />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;