import React from 'react';
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

function Card({ id, title, price, images, cardClass }) {
  const prettyTitle = title.length > 25 ? `${title.slice(0, 24)}...` : title;

  const changeSize = ({ target }) => {
    const { width , height } = target;
    const cardWidth = target.parentElement.clientWidth;
    if (width / height > 1) {
      target.style.paddingTop = `${(cardWidth - height) / 2}px`;
      target.style.paddingBottom = `${(cardWidth - height) / 2}px`;
    }
    else {
      target.style.height = `${cardWidth}px`;
      target.style.width = `${width * cardWidth / height}px`;
      target.style.margin = '0 auto';
    }
  }

  return (
    <div className={`card ${cardClass}`}>
      <img src={images[0]} className="card-img-top img-fluid" alt={title} onLoad={changeSize} />
      <div className="card-body">
        <p className="card-text" title={title}>{prettyTitle}</p>
        <p className="card-text">{price.toLocaleString()} руб.</p>
        <Link to={`/catalog/${id}`} className="btn btn-outline-primary">Заказать</Link>
      </div>
    </div>
  );
}

Card.defaultProps = {
  id: 0,
  title: "",
  price: 0,
  images: [],
  cardClass: "",
}

Card.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
  images: PropTypes.array,
  cardClass: PropTypes.string,
}


export default Card;
