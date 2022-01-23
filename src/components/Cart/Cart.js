import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartTable from "./CartTable";
import {
  getCartItemsFromLocalStorage,
  removeItemFromCart,
  setCartItemsToLocalStorage
} from "../../store/slices/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const { items, success } = useSelector((store) => store.cartSlice);

  useEffect(() => {
    // Получение всех позиций корзины из Локального хранилища
    dispatch(getCartItemsFromLocalStorage());
  }, [dispatch]);

  // Удаление позиции из корзины
  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
    dispatch(setCartItemsToLocalStorage());
  }

  return (
    <section className="cart">
      {items.length === 0
        ? <h2 className="text-center">Корзина пуста!</h2>
        : (
          <>
            <h2 className="text-center">Корзина</h2>
            <CartTable items={items} removeItemFromCartHandler={removeItemFromCartHandler} />
          </>
        )
      }
      {success
        ? (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Ваш заказ успешно оформлен!
          </div>
        )
        : null
      }
    </section>
  );
}

export default Cart;