import React from 'react';
import PropTypes from "prop-types";

function OrderForm({ phone, address, agreement, loading, onChangeFormFieldHandler, onSubmitHandler }) {
  const isDisabled = loading === 'pending';

  return (
    <form className="card-body" onSubmit={onSubmitHandler}>
      <div className="form-group">
        <label htmlFor="phone">Телефон</label>
        <input
          className="form-control"
          id="phone"
          placeholder="Ваш телефон"
          name="phone"
          value={phone}
          maxLength='12'
          pattern='^\+7\d{3}\d{7}$'
          title="Введите номер в формате +7хххххххххх"
          required
          onChange={onChangeFormFieldHandler}
          disabled={isDisabled}
        />
      </div>
      <div className="form-group">
        <label htmlFor="address">Адрес доставки</label>
        <input
          className="form-control"
          id="address"
          placeholder="Адрес доставки"
          name="address"
          value={address}
          required
          onChange={onChangeFormFieldHandler}
          disabled={isDisabled}
        />
      </div>
      <div className="form-group form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="agreement"
          name="agreement"
          checked={agreement}
          required
          onChange={onChangeFormFieldHandler}
          disabled={isDisabled}
        />
        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
      </div>
      <button
        type="submit"
        className="btn btn-outline-secondary"
        disabled={isDisabled}
      >
        {isDisabled ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-repeat rotate" viewBox="0 0 16 16">
            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"/>
          </svg>
        ) : 'Оформить'}
      </button>
    </form>
  );
}

OrderForm.defaultProps = {
  phone: '',
  address: '',
  agreement: false,
  loading: 'idle',
}

OrderForm.propTypes = {
  phone: PropTypes.string,
  address: PropTypes.string,
  agreement: PropTypes.bool,
  loading: PropTypes.string,
  onChangeFormFieldHandler: PropTypes.func,
  onSubmitHandler: PropTypes.func,
}

export default OrderForm;