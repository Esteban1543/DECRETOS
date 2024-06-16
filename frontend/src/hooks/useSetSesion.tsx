import { useEffect, useState } from 'react'

interface SessionUser {
  id_vendedor: string
}

export const useSetSesion = () => {

  //🔸 Setear información de la sesión
  const [sessionUser, setsessionUser] = useState<SessionUser | null>(null);

  useEffect(() => {

    const sessionData = sessionStorage.getItem('user_sesion');
    const session = sessionData ? JSON.parse(sessionData) : null; //Verificar primero que no sea null antes de parseJson para evitar error.

    setsessionUser(!!session && session.results[0]);
    // console.log(session);
  }, []);

  return { sessionUser }
}