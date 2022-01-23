import React from 'react';
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function CartIcon() {
  const navigate = useNavigate();
  const { items } = useSelector((store) => store.cartSlice);

  return (
    <div className="header-controls-pic header-controls-cart" onClick={() => navigate('/cart')}>
      {items.length === 0 ? null : (
        <div className="header-controls-cart-full">{items.length}</div>
      )}
      <div className="header-controls-cart-menu"></div>
    </div>
  );
}

export default CartIcon;