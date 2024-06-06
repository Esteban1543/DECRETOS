import { useEffect, useState } from 'react'

export const useSetSesion = () => {
  
  //🔸 Setear información de la sesión
  const [sessionUser, setsessionUser] = useState(null);

  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem('user_sesion'));
    setsessionUser(!!session && session.results[0]);
    // console.log(session);
  }, []);

  return {sessionUser}
}