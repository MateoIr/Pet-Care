import React, { useEffect, useState } from "react";
import useGetSignature from "../../hooks/signature/useGetSignature";
import useUpdatePet from "../../hooks/pet/useUpdatePet";

const GetSignature = ({ idconst }) => {
  const { isLoading, error, signatureData, searchSignature } =
    useGetSignature();
  const [signatureGet, setSignatureGet] = useState(null);
  const [id, setId] = useState("");

  const handleGetSignature = () => {
    searchSignature(id);
  };

  useEffect(() => {
    searchSignature(idconst.id);
  }, [idconst]);

  React.useEffect(() => {
    if (signatureData) {
      setSignatureGet(signatureData.firma);
    }
  }, [signatureData]);

  return (
    <div>
      {signatureGet ? (
        <img
          src={`data:image/png;base64,${signatureGet}`}
          alt="Firma guardada"
          style={{
            border: "1px solid black",
            width: "300px",
            height: "200px",
          }}
        />
      ) : (
        <p>No se ha guardado ninguna firma aún.</p>
      )}
      {error && (
        <p style={{ color: "red" }}>
          Error al obtener la firma: {error.message}
        </p>
      )}
    </div>
  );
};

export default GetSignature;
