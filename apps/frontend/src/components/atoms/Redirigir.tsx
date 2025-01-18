/* eslint-disable react/react-in-jsx-scope */

interface RedirigirProps {
  disableBorder?: boolean,
  click?: () => void
}

function Redirigir({ disableBorder, click }: RedirigirProps) {
  return (
    <button
      className="container_redirigir"
      style={disableBorder ? { outline: 'none' } : undefined}
      onClick={click}
    >
      <img src="/icons/redirect.svg" alt="Redirigir" width="60%" />
    </button>
  );
}

export default Redirigir