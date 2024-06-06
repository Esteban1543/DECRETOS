
import PropTypes from 'prop-types'

export default function CardPromedios({titulo_card}) {
  return (
    <article className='container_card_promedios'>
      <h4>{titulo_card}</h4>

      <section>
        <strong>Lorem</strong>
        <span>Lorem</span>

        <strong>Lorem</strong>
        <span>Lorem</span>
      </section>
    </article>
  )
}

CardPromedios.propTypes = {}