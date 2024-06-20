/* eslint-disable react/react-in-jsx-scope */
import '../../assets/styles/RowCardInform.css'
import React, { ReactNode } from "react";
import GradingIcon from '@mui/icons-material/Grading';

interface Props {
  titulo_card: string,
  cifra: number,
  color: string,
  color2: string,
  icon_name: string,
  children?: ReactNode,
  tag: boolean
}

export default function CardInformationDasbh({ titulo_card, cifra, color, color2, icon_name, children, tag }: Props) {
  return (
    <article className="card_information">

      <section className="card_section_1">
        <div className="container_logo" style={{ background: color }}>
          {/* <img
            // src={`/images/icons/${icon_name}`}
            src={GradingIcon}
            alt="Logo"
            width="60%"
          /> */}
          <GradingIcon
            color="action"
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