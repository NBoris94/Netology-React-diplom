import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import OrderForm from "./OrderForm";
import Error from "../Error";
import {
  clearCartItems,
  createOrderRequest,
  setCustomerInfo,
  setOnSuccess
} from "../../store/slices/cartSlice";

// Состояние формы заказа по умолчанию
const initialStateOrderFrom = {
  phone: '',
  address: '',
  agreement: false,
}

// Получение всех cookie
function getCookie() {
  return document.cookie.split("; ").reduce((acc, item) => {
    const [name, value] = item.split("=");

    return { ...acc, [name]: value };
  }, {});
}

function Order() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((store) => store.cartSlice);
  const [orderForm, setOrderForm] = useState(initialStateOrderFrom);
  let timeout;

  useEffect(() => {
    // Заполнение полей формы заказа из cookie
    const cookie = getCookie();
    setOrderForm((prevState) => {
      return { ...prevState, phone: cookie.phone, address: cookie.address };
    });

    return () => {
      // Очистка таймера показа сообщения об успешном оформлении заказа
      clearTimeout(timeout);
    };
  }, []);

  // Заполнение полей формы заказа
  const onChangeFormFieldHandler = ({ target }) => {
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setOrderForm((prevState) => {
      return { ...prevState, [name]: value }
    });
  }

  // Отправка формы заказа
  const onSubmitHandler = (e) => {
    e.preventDefault();

    createOrder();
  }

  // Повторная отправка формы заказа если возникла ошибка
  const repeatRequestHandler = (e) => {
    e.preventDefault();

    createOrder();
  }

  // Создание заказа
  const createOrder = () => {
    if (orderForm.agreement) {
      const order = {
        owner: {
          phone: orderForm.phone,
          address: orderForm.address,
        },
        items: items.map((i) => {
          return {
            id: i.productId,
            price: i.price,
            count: i.count,
          }
        })
      }

      dispatch(createOrderRequest(order)).then(() => {
        dispatch(setOnSuccess(true));
        dispatch(clearCartItems());
        dispatch(setCustomerInfo({name: 'phone', value: order.owner.phone}));
        dispatch(setCustomerInfo({name: 'address', value: order.owner.address}));

        timeout = setTimeout(() => {
          dispatch(setOnSuccess(false));
          navigate("/");
        }, 10000);
      });
    }
  }

  //Не показывать форму если в корзине ничего нет
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="order">
      <h2 className="text-center">Оформить заказ</h2>
      <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
        {error !== null
          ? <Error message='При загрузке произошла ошибка.' repeatRequestHandler={repeatRequestHandler} />
          : null
        }
        <OrderForm
          {...orderForm}
          loading={loading}
          onChangeFormFieldHandler={onChangeFormFieldHandler}
          onSubmitHandler={onSubmitHandler}
        />
      </div>
    </section>
  );
}

export default Order;