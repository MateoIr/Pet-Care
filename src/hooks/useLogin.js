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
    if (user && user.length > 0) {
      const { email: emailSelected, password: passwordSelected } = user[0];
      if (emailSelected === email && passwordSelected === password) {
        window.localStorage.setItem("userType", user[0].userType);
        setUser(user[0].token);
        navigate("/home");
      }
    }
  }, [user, email, password, navigate, setUser]);

  return {
    user,
    isLoading,
    error,
  };
};

export default useLogin;
