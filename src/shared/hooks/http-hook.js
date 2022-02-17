import { useState, useCallback, useRef, useEffect } from "react";
import axios from "axios";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  // suppose we make request(e.g. login or signup) and
  // then switch to other component without request completes
  // in such cases we have to abort request, so we use "useRef()"
  // "useRef()" consists data across different components
  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    // async (url, method = "get", body = null, headers = {}) => {
    async (params = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        // const response = await axios.request({
        //   url: url,
        //   // data: body,
        //   headers: headers,
        //   method: method,
        //   signal: httpAbortCtrl.signal,
        //   validateStatus: (status) => status < 510
        // });
        let passing = {...params, signal: httpAbortCtrl.signal};

        const response = await axios.request({
          url: params.url,
          method: params.method,
          data: params.data,
          headers: params.headers,
          // signal: httpAbortCtrl.signal,
          validateStatus: params.validateStatus
        });

      

        console.log("made it here");
        const responseData = response.data;
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        console.log(responseData);
        if (response.status > 400) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  });

  return { isLoading, error, sendRequest, clearError };
};
