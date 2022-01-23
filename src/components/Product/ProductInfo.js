import React from 'react';
import PropTypes from "prop-types";

function ProductInfo(
    {
      title,
      images,
      sku,
      manufacturer,
      color,
      material,
      season,
      reason,
      sizes,
      selectedSize,
      count,
      onClickSizeHandler,
      decrementCount,
      incrementCount,
      addToCartHandler
    }
  ) {
  const availableSizes = sizes.filter((size) => size.avalible === true);

  return (
    <section className="catalog-item">
      <h2 className="text-center">{title}</h2>
      <div className="row">
        <div className="col-5">
          <img src={images[0]} className="img-fluid" alt={title} />
        </div>
        <div className="col-7">
          <table className="table table-bordered">
            <tbody>
            <tr>
              <td>Артикул</td>
              <td>{sku}</td>
            </tr>
            <tr>
              <td>Производитель</td>
              <td>{manufacturer}</td>
            </tr>
            <tr>
              <td>Цвет</td>
              <td>{color}</td>
            </tr>
            <tr>
              <td>Материалы</td>
              <td>{material}</td>
            </tr>
            <tr>
              <td>Сезон</td>
              <td>{season}</td>
            </tr>
            <tr>
              <td>Повод</td>
              <td>{reason}</td>
            </tr>
            </tbody>
          </table>
          <div className="text-center">
            <p>Размеры в наличии:&nbsp;
              {availableSizes.length === 0
                ? <span>Доступных размеров нет!</span>
                : availableSizes.map((s) => {
                  return (
                    <span
                      key={s.size}
                      className={`catalog-item-size ${selectedSize === s.size ? 'selected' : null}`}
                      onClick={() => onClickSizeHandler(s.size)}
                    >
                      {s.size}
                    </span>
                  );
                })
              }
            </p>
            {availableSizes.length === 0 ? null : (
              <p>
                Количество:
                <span className="btn-group btn-group-sm pl-2">
                  <button className="btn btn-secondary" onClick={decrementCount}>-</button>
                  <span className="btn btn-outline-primary">{count}</span>
                  <button className="btn btn-secondary" onClick={incrementCount}>+</button>
                </span>
              </p>
            )}
          </div>
          {availableSizes.length === 0 ? null : (
            <button
              className="btn btn-danger btn-block btn-lg"
              disabled={selectedSize === '' ? true : null}
              onClick={addToCartHandler}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

ProductInfo.defaultProps = {
  title: '',
  images: [],
  sku: '',
  manufacturer: '',
  color: '',
  material: '',
  season: '',
  reason: '',
  sizes: [],
  selectedSize: '',
  count: 1,
}

ProductInfo.propTypes = {
  title: PropTypes.string,
  images: PropTypes.array,
  sku: PropTypes.string,
  manufacturer: PropTypes.string,
  color: PropTypes.string,
  material: PropTypes.string,
  season: PropTypes.string,
  reason: PropTypes.string,
  sizes: PropTypes.array,
  selectedSize: PropTypes.string,
  count: PropTypes.number,
  onClickSizeHandler: PropTypes.func,
  decrementCount: PropTypes.func,
  incrementCount: PropTypes.func,
  addToCartHandler: PropTypes.func,
}

export default ProductInfo;