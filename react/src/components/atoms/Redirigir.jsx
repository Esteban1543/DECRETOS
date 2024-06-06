import PropTypes from "prop-types";

export default function Redirigir({ disableBorder, click }) {
  return (
    <button
      className="container_redirigir"
      style={disableBorder ? { outline: 'none' } : null}
      onClick={click}
    >
      <img src="/images/icons/icon-redirect.png" alt="Redirigir" width="60%" />
    </button>
  );
}

Redirigir.propTypes = {
  disableBorder: PropTypes.bool,
  click: PropTypes.func,
};
