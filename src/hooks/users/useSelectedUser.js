import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/users";

const useSelectedUser = (id) => {
  const {
    data: userSlected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id, // Ensures the query runs only if id is provided
  });

  return {
    userSlected,
    isLoading,
    error,
  };
};

export default useSelectedUser;
