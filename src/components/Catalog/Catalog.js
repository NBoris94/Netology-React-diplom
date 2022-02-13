import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";
import Categories from "./Categories";
import Search from "./Search";
import Preloader from "../Preloader";
import Error from "../Error";
import Products from "./Products";
import TopSales from "../TopSales/TopSales";
import {
  changeSearchStringValue,
  clearProducts,
  getCategoriesRequest,
  getProductsRequest
} from "../../store/slices/catalogSlice";

function Catalog({ withSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    products,
    categories,
    isAllProductsLoaded,
    selectedCategoryId,
    offset,
    searchString,
    loading,
    error
  } = useSelector((store) => store.catalogSlice);

  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    const categoryId = params.categoryId === undefined ? 0 : Number(params.categoryId);
    const searchString = params.search === undefined ? '' : params.search;

    // Сначала подгружем все категории, а потом товары
    dispatch(getCategoriesRequest()).then(({ type }) => {
      if (type === 'categories/getAll/fulfilled') {
        dispatch(getProductsRequest({categoryId, offset: 0, searchString}));
      }
    });
  }, [dispatch]);

  // Изменение значений поиска
  const changeFieldValueHandler = (e) => {
    if (e.target.value === '') {
      dispatch(clearProducts());
      dispatch(getProductsRequest({categoryId: selectedCategoryId, offset, searchString: ''}))
        .then(() => {
          const params = {};

          if(selectedCategoryId !== 0) {
            params.categoryId = selectedCategoryId;
          }

          navigate({
            pathname: '/catalog',
            search: `?${createSearchParams(params)}`
          })
        });
    }
    dispatch(changeSearchStringValue(e.target.value))
  }

  // Получение товаров через поиск
  const onSubmitSearchHandler = (e) => {
    e.preventDefault();
    if (searchString !== '') {
      dispatch(clearProducts());
      dispatch(getProductsRequest({categoryId: selectedCategoryId, offset: 0, searchString}))
        .then(() => {
          const params = { search: searchString };

          if(selectedCategoryId !== 0) {
            params.categoryId = selectedCategoryId;
          }

          navigate({
            pathname: '/catalog',
            search: `?${createSearchParams(params)}`
          })
        });
    }
  }

  // Получение товаров при смене категории
  const onClickCategoryHandler = (e, categoryId) => {
    e.preventDefault();

    dispatch(clearProducts());
    dispatch(getProductsRequest({categoryId, offset, searchString}))
      .then(() => {
        if (withSearch) {
          const params = {};

          if (categoryId !== 0) {
            params.categoryId = categoryId;
          }

          if(searchString !== '') {
            params.search = searchString;
          }

          navigate({
            pathname: '/catalog',
            search: `?${createSearchParams(params)}`
          })
        }
      });
  }

  // Получение товаров при клике на "Загрузить еще"
  const loadMoreProductsHandler = () => {
    dispatch(getProductsRequest({categoryId: selectedCategoryId, offset: offset + 6, searchString}));
  }

  // Повторное получение товаров если возникла ошибка
  const repeatRequestHandler = (e) => {
    e.preventDefault();

    dispatch(getProductsRequest({categoryId: selectedCategoryId, offset, searchString}));
  }

  // Не отображать на Главной если нет товаров
  if (
    products.length === 0
    && !withSearch
    && loading === 'idle'
    && error === null
  ) {
    return null;
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      {withSearch
        ? <Search
            searchString={searchString}
            changeFieldValueHandler={changeFieldValueHandler}
            onSubmitSearchHandler={onSubmitSearchHandler}
          />
        : null
      }

      <Categories
        categories={categories}
        selectedId={selectedCategoryId}
        onClickCategoryHandler={onClickCategoryHandler}
      />
      <Products products={products} />

      {loading === 'pending' ? <Preloader /> : null}

      {loading === 'pending' || isAllProductsLoaded || error !== null ? null : (
          <div className="text-center">
            <button className="btn btn-outline-primary" onClick={loadMoreProductsHandler}>Загрузить ещё</button>
          </div>
        )
      }

      {products.length === 0 && error === null && loading === 'idle'
        ? <>
          <p>По данному запросу ничего не найдено</p>
          <TopSales />
        </>
        : null
      }

      {error === null ? null : (
        <Error message='При загрузке произошла ошибка.' repeatRequestHandler={repeatRequestHandler} />
      )}
    </section>
  );
}

Catalog.defaultProps = {
  withSearch: false
}

Catalog.propTypes = {
  withSearch: PropTypes.bool
}

export default Catalog;