import { useEffect, useState } from 'react'
import { DatosPersonaType } from '../helpers/Types';


export const useSetSesion = () => {

  //🔸 Setear información de la sesión
  const [sessionUser, setsessionUser] = useState<DatosPersonaType | null>(null);

  useEffect(() => {

    const sessionData = sessionStorage.getItem('user_sesion');
    const session = sessionData ? JSON.parse(sessionData) : null; //Verificar primero que no sea null antes de parseJson para evitar error.
    console.log(session.datos_persona[0])
    setsessionUser(session.datos_persona[0] || null);
    // console.log(session);
  }, []);

  return { sessionUser }
}