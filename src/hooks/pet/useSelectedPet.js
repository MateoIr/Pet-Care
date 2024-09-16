import { useQuery } from "@tanstack/react-query";
import { getPet } from "../../api/cliets";
import { useNavigate } from "react-router-dom";

const useSelectedPet = (id) => {
  const navigate = useNavigate();
  const {
    data: petSelected,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: () => getPet(id),
    enabled: !!id,
  });

  if (error) {
    navigate("/");
  }

  return {
    petSelected,
    isLoading,
    error,
  };
};

export default useSelectedPet;