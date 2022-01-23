import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function CartItem({ idx, id, productId, title, selectedSize, count, price, removeItemFromCartHandler }) {
  return (
    <tr>
      <td scope="row">{idx}</td>
      <td><Link to={`/products/${productId}`}>{title}</Link></td>
      <td>{selectedSize}</td>
      <td>{count}</td>
      <td>{price.toLocaleString()} руб.</td>
      <td>{(price*count).toLocaleString()} руб.</td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => removeItemFromCartHandler(id)}
        >
          Удалить
        </button>
      </td>
    </tr>
  );
}

CartItem.defaultProps = {
  idx: 0,
  id: '',
  productId: 0,
  title: '',
  selectedSize: '',
  count: 0,
  price: 0,
}

CartItem.propTypes = {
  idx: PropTypes.number,
  id: PropTypes.string,
  productId: PropTypes.number,
  title: PropTypes.string,
  selectedSize: PropTypes.string,
  count: PropTypes.number,
  price: PropTypes.number,
  removeItemFromCartHandler: PropTypes.func,
}

export default CartItem;