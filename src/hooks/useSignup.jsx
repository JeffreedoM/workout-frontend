import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from "../../api/axios";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);
    axios
      .post("users/signup", { email, password })
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

  return { signup, isLoading, error };
};
