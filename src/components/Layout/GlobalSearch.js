import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

const GlobalSearch = forwardRef(({ search, invisibleSearchForm, changeFieldValueHandler, searchSubmitHandler }, ref) => {
  return (
    <form
      className={`header-controls-search-form form-inline ${invisibleSearchForm ? "invisible" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        searchSubmitHandler();
      }}
    >
      <input className="form-control" placeholder="Поиск" ref={ref} value={search} onChange={changeFieldValueHandler} />
      <button type="submit" style={{display:'none'}}></button>
    </form>
  );
});

GlobalSearch.defaultProps = {
  search: '',
  invisibleSearchForm: false,
}

GlobalSearch.propTypes = {
  search: PropTypes.string,
  invisibleSearchForm: PropTypes.bool,
  changeFieldValueHandler: PropTypes.func,
  searchSubmitHandler: PropTypes.func,
};

export default GlobalSearch;
