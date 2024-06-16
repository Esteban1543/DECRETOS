import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGetData(url: string) {
  // console.log(url)
  const [newFetch, setNewFecth] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //🔸 Realizar solicitud GET
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
        // console.log(response.data)
        setLoading(false);
      }
      catch (error) {
        setError(error);
      }
    };

    setTimeout(() => getData(), 500);
  }, [url]);

  //🔸 Solcitar una nueva solicitud
  const refetch = () => {
    setLoading(true);
    setNewFecth(!newFetch);
  };

  return { data, loading, error, refetch };
}