import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Box, Grid } from "@mui/material";
import foot from "../../images/foot.jpg";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import useSignature from "../../hooks/signature/useSignature";
import GetSignature from "../../components/getSignature/GetSignature";

const Signature = ({ id, idconst }) => {
  const sigCanvas = useRef(null);

  const clear = () => {
    sigCanvas.current.clear();
  };
  console.log(id);

  const { saveSignature } = useSignature(id);

  const [savedSignature, setSavedSignature] = useState(null); // Estado para guardar la firma

  const save = () => {
    const dataURL = sigCanvas.current.toDataURL();
    saveSignature({ signature: dataURL, id }); // Aquí puedes manejar la firma, por ejemplo, enviarla a un servidor o guardarla localmente
    setSavedSignature(dataURL);
  };

  console.log(idconst);

  return (
    <Grid item xs={12}>
      {idconst == null ? (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h2>Firma aquí</h2>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center", // Centrar horizontalmente
                  alignItems: "center", // Centrar verticalmente
                  height: "100%", // Asegúrate de que ocupe toda la altura
                }}
              >
                <Box
                  sx={{
                    boxShadow: 6,
                    borderRadius: 2,
                    m: 3,
                    backgroundColor: "grey",
                    width: 300,
                  }}
                >
                  <SignatureCanvas
                    ref={sigCanvas}
                    penColor="black"
                    canvasProps={{
                      border: "2px solid red",
                      width: 300,
                      height: 200,
                      className: "signature-canvas",
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                xs={{
                  width: "100 %",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box>
                  <button onClick={clear}>Limpiar</button>
                </Box>
                <Box>
                  <button onClick={save}>Guardar</button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Grid item xs={12}>
          <GetSignature idconst={idconst} />
        </Grid>
      )}
    </Grid>
  );
};

export default Signature;
