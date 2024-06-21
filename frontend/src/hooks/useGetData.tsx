import { useState, useEffect } from 'react';
import axios from 'axios';

interface DataType<T> {
  status: boolean;
  message: string | null;
  data: Array<T> | null;
  error: string | null;
}

interface UseGetDataReturn<T> {
  data: DataType<T> | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGetData<T>(url: string): UseGetDataReturn<T> {
  
  const [newFetch, setNewFetch] = useState(false);
  const [data, setData] = useState<DataType<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get<DataType<T>>(url);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    getData();
  }, [url, newFetch]);

  const refetch = () => {
    setLoading(true);
    setNewFetch(!newFetch);
  };

  return { data, loading, error, refetch };
}
