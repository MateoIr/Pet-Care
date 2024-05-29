import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllAnimals, getAllRace, registerAnimal } from "../api/cliets";
import { useNavigate } from "react-router-dom";

const useGetRace = () => {
  const {
    data: race,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["race"],
    queryFn: () => getAllRace(),
  });

  return {
    race,
    isLoading,
    error,
  };
};

const useGetAnimal = () => {
  const {
    data: animal,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["animal"],
    queryFn: () => getAllAnimals(),
  });

  return {
    animal,
    isLoading,
    error,
  };
};

const usePetCreate = ({ setPetExist }) => {
  const navigate = useNavigate();

  const {
    isPending: isLoading,
    error,
    mutate: createPet,
  } = useMutation({
    mutationFn: registerAnimal,
    onSuccess: (data) => {
      if (data?.error) {
        setPetExist(data.error);
      } else {
        navigate("/home");
      }
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    },
  });
  return { isLoading, error, createPet };
};

export { useGetRace, useGetAnimal, usePetCreate };
