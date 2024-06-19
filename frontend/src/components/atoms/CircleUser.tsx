interface CircleUserProps {
  inicial: string;
  medida: string;
}
/*
  Maneras de Tipado para TP 📌
*/

// function CircleUser({ inicial, medida }: CircleUserProps) {
// function CircleUser(props: CircleUserProps) { //🔻const { inicial, medida } = props;
const CircleUser: React.FC<CircleUserProps> = ({ inicial, medida }) => {
  const circle_colors = {
    1: '#83e083', // Verde claro
    2: 'rgb(110, 199, 130)', // Verde pastel
    3: 'rgba(251, 172, 96, .8)', // Naranja pastel
    4: 'rgb(205, 178, 150)', // Beige pastel
    5: '#80C4E9', // Azul pastel claro
    6: 'rgb(246, 203, 220)', // Rosa pastel claro
    7: 'rgb(255, 240, 145)', // Amarillo pastel claro
    8: 'rgb(177, 186, 216)', // Azul grisáceo pastel
    9: '#95D2B3', 
    10: 'rgb(255, 210, 183)', // Melocotón pastel claro
    11: '#FF6969'
  };

  const getRandomColor = () => {
    const keys = Object.keys(circle_colors);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return circle_colors[randomKey];
  };

  const styles = {
    borderRadius: '50%',
    width: medida,
    height: medida,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // outline: '3px solid var(--color-azul-light1)',
    backgroundColor: getRandomColor(),
  }

  return (
    <article style={styles}>
      <span style={{ fontSize: `calc(${medida} / 2)` }}>{inicial.toUpperCase()}</span>
    </article>
  );
}

export default CircleUser;