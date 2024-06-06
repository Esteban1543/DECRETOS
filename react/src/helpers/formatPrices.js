
/*
    📌 Función para dar formato en Pesos Colombianos
*/

export const formatPrices = (price) => {

  if (!price) return '...';

  const priceString = price?.toString();

  const decimas = priceString.substr(-3);

  const unidades = priceString.substr(-6, 1);
  const decenas = priceString.substr(-6, 2);
  const centenas = priceString.substr(-6, 3);

  const miles = priceString.substr(-7, 1);
  const diezmiles = priceString.substr(-8, 2);
  
  const millones = priceString.substring(0, 3)

  if (price < 9999 && price > 999) return `${unidades}.${decimas}`;
  else if (price < 99999 && price > 9999) return `${decenas}.${decimas}`;
  else if (price < 999999 && price > 99999) return `${centenas}.${decimas}`;
  else if (price < 9999999 && price > 999999) return `${miles}'${centenas}.${decimas}`;
  else if (price < 99999999 && price > 9999999) return `${diezmiles}'${centenas}.${decimas}`;
  else if (price > 99999999) return `${millones}M`;
  else return price;
}