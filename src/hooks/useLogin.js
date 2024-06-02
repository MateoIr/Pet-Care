import { useMutation } from "@tanstack/react-query";
import { getUserSelected } from "../api/users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLogin = ({ email, password, setUser }) => {
  const {
    mutate,
    data: user,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getUserSelected,
  });
  useEffect(() => {
    if (email && password) {
      mutate({ email, password });
    }
  }, [email, password, mutate]);

  const navigate = useNavigate();
  useEffect(() => {
    console.log("error: " + error);
    if (user != undefined) {
      if (!error) {
        window.localStorage.setItem("userType", user.denominacion);
        setUser(user.email);
        navigate("/home");
      }
    }
  }, [user, error, email, password, navigate, setUser]);

  return {
    user,
    isLoading,
    error,
  };
};

export default useLogin;
