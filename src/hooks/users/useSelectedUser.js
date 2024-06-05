import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/users";
import { useNavigate } from "react-router-dom";

const useSelectedUser = (id) => {
  const navigate = useNavigate();
  const {
    data: userSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    userSelected,
    isLoading,
    error,
  };
};

export default useSelectedUser;
