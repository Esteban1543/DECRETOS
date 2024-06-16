
interface SteperProps {
  pagina: number
}

export default function Steper({ pagina }:SteperProps) {

  // console.log('pagina en stepper ', pagina)

  return (
    <article className="section_steps">

      <section>
        <div className={pagina === 1 ? 'active_step' : 'inactive_step'}>1</div>
        <p style={pagina === 1 ? {fontWeight: '501'} : undefined}>Encabezado</p>
      </section>

      <span />

      <section>
        <div className={pagina === 2 ? 'active_step' : 'inactive_step'}>2</div>
        <p style={pagina === 2 ? {fontWeight: '501'} : undefined}>Decretos</p>
      </section>

      <span />

      <section>
        <div className={pagina === 3 ? 'active_step' : 'inactive_step'}>3</div>
        <p style={pagina === 3 ? {fontWeight: '501'} : undefined}>Confirmación</p>
      </section>
    </article>
  )
}