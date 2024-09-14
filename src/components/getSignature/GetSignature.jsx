import React, { useState } from "react";
import useGetSignature from "../../hooks/signature/useGetSignature";

const GetSignature = () => {
  const { isLoading, error, signatureData, searchSignature } =
    useGetSignature();
  const [signatureGet, setSignatureGet] = useState(null);
  const [id, setId] = useState("");

  const handleGetSignature = () => {
    searchSignature(id);
  };

  React.useEffect(() => {
    if (signatureData) {
      setSignatureGet(signatureData.firma);
    }
  }, [signatureData]);

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Ingrese el ID"
      />
      <button onClick={handleGetSignature} disabled={isLoading}>
        {isLoading ? "Cargando..." : "Obtener firma"}
      </button>
      <h2>Firma guardada</h2>

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
