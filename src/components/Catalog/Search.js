import React from 'react';
import PropTypes from 'prop-types';

function Search({ searchString, changeFieldValueHandler, onSubmitSearchHandler }) {
  return (
    <form className="catalog-search-form form-inline" onSubmit={onSubmitSearchHandler}>
      <input
        className="form-control"
        name="search"
        placeholder="Поиск"
        value={searchString}
        onChange={changeFieldValueHandler} />
    </form>
  );
}

Search.defaultProps = {
  searchString: '',
};

Search.propTypes = {
  searchString: PropTypes.string,
  changeFieldValueHandler: PropTypes.func,
  onSubmitSearchHandler: PropTypes.func,
};

export default Search;