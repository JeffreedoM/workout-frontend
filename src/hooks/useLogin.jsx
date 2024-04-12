import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("http://localhost:5000/users/login", { email, password })
      .then((response) => {
        // Save the user to local storage
        localStorage.setItem("user", JSON.stringify(response.data));

        // Update the auth context
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      })
      .catch((err) => {
        const { error } = err.response.data;
        setError(error);
        setIsLoading(false);
      });
  };

  return { login, isLoading, error };
};
