import { useState, useEffect } from 'react';
import axios from 'axios';

export function useGetData(url) {
  // console.log(url)
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    setTimeout(() => getData(), 500);
  }, [url]);

  const refetch = () => {
    setLoading(true);
    getData();
  };

  return { data, loading, error, refetch };
}