import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
import { getVeterinarian } from "../../api/veterinarian";

const useGetSelectedVeterinarian = (id) => {
  const navigate = useNavigate();
  const {
    data: veterinarianSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getVeterinarian(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    veterinarianSelected,
    isLoading,
    error,
  };
};

export default useGetSelectedVeterinarian;
