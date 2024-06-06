import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePostData(url, formData) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sendData = async () => {
      try {
        const response = await axios.post(url, formData);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    }

    setTimeout(() => sendData(), 1000);
  }, [url, formData])

  return {loading, data, error}
}