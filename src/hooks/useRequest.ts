import { useState, useEffect } from "react";
import axios from "axios";


const useRequest = (method, resource, body) => {
  const API_URL = process.env.BASE_URL

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios({
          method: method,
          url: API_URL + resource,
          data: body
        });
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [resource, method, body]);

  return { isLoading, apiData, serverError };
};


export default useRequest