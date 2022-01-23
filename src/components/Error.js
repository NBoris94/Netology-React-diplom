import React from 'react';
import PropTypes from "prop-types";

function Error({ message, repeatRequestHandler }) {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
      {repeatRequestHandler === undefined
        ? null
        : <a
            href="#"
            className="alert-link"
            onClick={(e) => repeatRequestHandler(e)}
          >&nbsp;Нажмите сюда для того, чтобы попробовать снова.</a>
      }
    </div>
  );
}

Error.defaultProps = {
  message: '',
}

Error.propTypes = {
  message: PropTypes.string,
  repeatRequestHandler: PropTypes.func,
}

export default Error;