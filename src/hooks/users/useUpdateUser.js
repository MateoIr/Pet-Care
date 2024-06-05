import { useMutation } from "@tanstack/react-query";
import { updateUserSelected } from "../../api/users";
import { useNavigate } from "react-router-dom";

const useUpdateUser = () => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: updateUser,
  } = useMutation({
    mutationFn: updateUserSelected,
    onSuccess: () => {
      navigate("/home");
    },
  });

  return { isLoading, error, updateUser };
};

export default useUpdateUser;
