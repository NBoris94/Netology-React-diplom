import React from 'react';
import PropTypes from "prop-types";

function Categories({ categories, selectedId, onClickCategoryHandler }) {
  //Не отображать если нет категорий
  if (categories.length === 0) {
    return null;
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      <li className="nav-item">
        <a
          className={`nav-link ${selectedId === 0 ? 'active' : null}`}
          href="#"
          onClick={(e) => onClickCategoryHandler(e, 0)}
        >
          Все
        </a>
      </li>
      {categories.map((category) => {
        return (
          <li className="nav-item" key={category.id}>
            <a
              className={`nav-link ${selectedId === category.id ? 'active' : null}`}
              href="#"
              onClick={(e) => onClickCategoryHandler(e, category.id)}
            >
              {category.title}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

Categories.defaultProps = {
  categories: [],
  selectedId: 0
}

Categories.propTypes = {
  categories: PropTypes.array,
  selectedId: PropTypes.number,
  onClickCategoryHandler: PropTypes.func
}

export default Categories;