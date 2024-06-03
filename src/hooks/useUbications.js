import { useQuery } from "@tanstack/react-query";
import {
  getAllLocalidades,
  getAllPaises,
  getAllProvincias,
} from "../api/cliets";

const useGetLocalidad = () => {
  const {
    data: localidades,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["race"],
    queryFn: () => getAllLocalidades(),
  });

  return {
    localidades,
    isLoading,
    error,
  };
};

const useGetPais = () => {
  const {
    data: paises,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["pais"],
    queryFn: () => getAllPaises(),
  });

  return {
    paises,
    isLoading,
    error,
  };
};
const useGetProvincia = () => {
  const {
    data: provincias,
    isLoading,
    error: error,
  } = useQuery({
    queryKey: ["animal"],
    queryFn: () => getAllProvincias(),
  });

  return {
    provincias,
    isLoading,
    error,
  };
};
export { useGetLocalidad, useGetPais, useGetProvincia };
