interface HeaderRedaccionProps {
  titulo: string
}

function HeaderRedaccion({ titulo }: HeaderRedaccionProps) {
  return (
    <header
      className="header_facturacion_container"
    >
      <h2>
        {titulo}
      </h2>
    </header>
  );
}

export default HeaderRedaccion;