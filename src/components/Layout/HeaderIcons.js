import React, {useEffect, useRef, useState} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {changeSearchStringValue, getProductsRequest} from "../../store/slices/catalogSlice";
import CartIcon from "../Cart/CartIcon";
import GlobalSearch from "./GlobalSearch";

function HeaderIcons() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invisibleSearchForm, setInvisibleSearchForm] = useState(true);
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    // Фокус на поле поиска при открытии
    if (!invisibleSearchForm) {
      searchInputRef.current.focus();
    }
  }, [invisibleSearchForm]);

  // Открытие и закрытие формы поиска
  const openSearchFormHandler = () => {
    if (search !== '') {
      searchSubmitHandler();
      return;
    }
    setInvisibleSearchForm(prevState => !prevState);
  }

  // Заполнение значения строки поиска
  const changeFieldValueHandler = ({ target }) => {
    setSearch(target.value);
    dispatch(changeSearchStringValue(target.value));
  }

  // Отправка запроса
  const searchSubmitHandler = () => {

    if (search === '') {
      dispatch(changeSearchStringValue(''));
      setInvisibleSearchForm(true);
      return;
    }

    dispatch(getProductsRequest({ categoryId: 0, offset: 0, searchString: search })).then(() => {
      setSearch('');
      searchInputRef.current.blur();
      setInvisibleSearchForm(true);
      navigate("/catalog");
    });
  }

  return (
    <>
      <div className="header-controls-pics">
        <div className="header-controls-pic header-controls-search" onClick={openSearchFormHandler} ></div>
        <CartIcon />
      </div>
      <GlobalSearch
        search={search}
        invisibleSearchForm={invisibleSearchForm}
        changeFieldValueHandler={changeFieldValueHandler}
        searchSubmitHandler={searchSubmitHandler}
        ref={searchInputRef}
      />
    </>
  );
}

export default HeaderIcons;