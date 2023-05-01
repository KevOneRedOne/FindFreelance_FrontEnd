import { useState } from "react";

const useFetch = ({ url, method, body, token }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          ...(token && { authorization: token }),
        },
        ...(body && { body: JSON.stringify(body) }),
      });

      const dataJson = await response.json();

      if (!dataJson.success) {
        throw new Error(dataJson.message);
      }
      setData(dataJson);

    } catch (error) {
      console.log(error);
      setError(error);

    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
    }
  };

  return { fetchData, data, error, loading };
};

export default useFetch;
