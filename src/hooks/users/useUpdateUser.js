import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/users";
import { useNavigate } from "react-router-dom";

const useUpdateUser = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createUser,
  } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/home");
    },
  });

  return { isLoading, error, createUser };
};

export default useUpdateUser;
