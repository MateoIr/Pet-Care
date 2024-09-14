import React from "react";
import { useMutation } from "@tanstack/react-query";
import { getSignature } from "../../api/services";

const useGetSignature = () => {
  const {
    data: signatureData, // Datos obtenidos
    isLoading,
    error,
    mutate: searchSignature, // Función para ejecutar la mutación
  } = useMutation({
    mutationFn: getSignature, // Función que realiza la operación
    onSuccess: (data) => {
      console.log("Datos obtenidos:", data);
    },
    onError: (error) => {
      console.error("Error al obtener la firma:", error);
    },
  });

  return { signatureData, isLoading, error, searchSignature };
};

export default useGetSignature;
