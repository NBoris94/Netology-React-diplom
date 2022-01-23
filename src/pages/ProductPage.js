import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import ProductInfo from "../components/Product/ProductInfo";
import Preloader from "../components/Preloader";
import Error from "../components/Error";
import {getProductByIdRequest} from "../store/slices/productSlice";
import {addItemToCart, setCartItemsToLocalStorage} from "../store/slices/cartSlice";

function ProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { product, loading, error } = useSelector((store) => store.productSlice);
  const [selectedSize, setSelectedSize] = useState('');
  const [count, setCount] = useState(1);

  useEffect(() => {
    // Получение товара по id
    dispatch(getProductByIdRequest({ productId: id }));
  }, [dispatch, id]);

  // Выбор размера
  const onClickSizeHandler = (size) => {
    setSelectedSize(size);
  }

  // Увеличение количества на 1, но не более 10
  const incrementCount = () => {
    setCount((prevState) => prevState === 10 ? prevState : prevState + 1);
  }

  // Уменьшение количества на 1, но не менее 1
  const decrementCount = () => {
    setCount((prevState) => prevState === 1 ? prevState : prevState - 1);
  }

  // Добавление в корзину
  const addToCartHandler = () => {
    const cartItem = {
      productId: product.id,
      title: product.title,
      selectedSize,
      count,
      price: product.price,
    };

    dispatch(addItemToCart(cartItem));
    dispatch(setCartItemsToLocalStorage());
    navigate("/cart");
  }

  // Повторное получение товара по id если возникла ошибка
  const repeatRequestHandler = (e) => {
    e.preventDefault();

    dispatch(getProductByIdRequest({ productId: id }));
  }

  return (
    loading === 'pending'
      ? <Preloader />
      : error === null
        ? <ProductInfo
            { ...product }
            selectedSize={selectedSize}
            count={count}
            onClickSizeHandler={onClickSizeHandler}
            incrementCount={incrementCount}
            decrementCount={decrementCount}
            addToCartHandler={addToCartHandler}
          />
        : <Error message='При загрузке произошла ошибка.' repeatRequestHandler={repeatRequestHandler} />
  );
}

export default ProductPage;