import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getTopSalesRequest} from "../../store/slices/topSalesSlice";
import Preloader from "../Preloader";
import Error from "../Error";
import Card from "../Product/Card";

function TopSales() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((store) => store.topSalesSlice);

  useEffect(() => {
    // Получение всех популярных товаров
    dispatch(getTopSalesRequest());
  }, [dispatch]);

  // Повторное получение популярных товаров если возникла оишбка
  const repeatRequestHandler = (e) => {
    e.preventDefault();

    dispatch(getTopSalesRequest());
  }

  // Не отоброжать если нет популярных товаров
  if (products.length === 0 && loading === 'idle' && error === null) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      {loading === 'pending' ? <Preloader /> : (
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-4" key={product.id}>
                <Card {...product} />
              </div>
            );
          })}
        </div>
      )}

      {error === null ? null : (
        <Error message='При загрузке произошла ошибка.' repeatRequestHandler={repeatRequestHandler} />
      )}
    </section>
  );
}

export default TopSales;