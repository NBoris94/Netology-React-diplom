import React from 'react';
import PropTypes from "prop-types";
import CartItem from "./CartItem";

function CartTable({ items, removeItemFromCartHandler }) {
  const totalPrice = items.reduce((sum, currentItem) => sum + currentItem.price * currentItem.count, 0);

  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Название</th>
          <th scope="col">Размер</th>
          <th scope="col">Кол-во</th>
          <th scope="col">Стоимость</th>
          <th scope="col">Итого</th>
          <th scope="col">Действия</th>
        </tr>
      </thead>
      <tbody>
        {items && items.map((i, idx) => {
          return (
            <CartItem
              key={i.id}
              idx={idx + 1}
              {...i}
              removeItemFromCartHandler={removeItemFromCartHandler}
            />
          )
        })}
        <tr>
          <td colSpan="5" className="text-right">Общая стоимость</td>
          <td>{totalPrice.toLocaleString()} руб.</td>
        </tr>
      </tbody>
    </table>
  );
}

CartTable.defaultProps = {
  items: [],
}

CartTable.propTypes = {
  items: PropTypes.array,
  removeItemFromCartHandler: PropTypes.func,
}

export default CartTable;