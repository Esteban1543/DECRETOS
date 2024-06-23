/* eslint-disable react/react-in-jsx-scope */
import '../../assets/styles/RowCardInform.css'
import React from "react";
import GradingIcon from '@mui/icons-material/Grading';

interface Props {
  titulo_card: string,
  cifra: number | string,
  color: string,
  color2: string,
  children?: React.ReactNode,
  tag: boolean
}

export default function CardInformationDasbh({ titulo_card, cifra, color, color2, children, tag }: Props) {
  return (
    <article className="card_information">

      <section className="card_section_1">
        <div className="container_logo" style={{ background: color }}>
          <GradingIcon
            sx={{ color: color2 }}
          />

        </div>

        <h3>{titulo_card}</h3>

        {tag && <div className="tag_card_information">Año</div>}
      </section>

      <section className="card_section_2">
        <span>{cifra}</span>

        {children}

      </section>

      <div className="linea_bottom" style={{ background: color2 }}></div>
    </article>
  );
}

CardInformationDasbh.propTypes = {

};