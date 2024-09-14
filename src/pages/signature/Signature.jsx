import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Box, Grid } from "@mui/material";
import foot from "../../images/foot.jpg";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import useSignature from "../../hooks/signature/useSignature";
import GetSignature from "../../components/getSignature/GetSignature";

const Signature = ({ setUser }) => {
  const sigCanvas = useRef(null);

  const clear = () => {
    sigCanvas.current.clear();
  };

  const { saveSignature } = useSignature();

  const [savedSignature, setSavedSignature] = useState(null); // Estado para guardar la firma

  const save = () => {
    const dataURL = sigCanvas.current.toDataURL();
    saveSignature({ signature: dataURL }); // Aquí puedes manejar la firma, por ejemplo, enviarla a un servidor o guardarla localmente
    setSavedSignature(dataURL);
  };

  return (
    <>
      <Box className="footRight">
        <img src={foot} alt="foot image 2" />
      </Box>
      <Grid
        container
        sx={{
          textAlign: "center",
          height: "100vh",
          alignItems: "start",
        }}
      >
        <Grid item xs={12} sm={2}>
          <Box>
            <CustomNavBar setUser={setUser} />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{
            height: "90%",
          }}
        >
          <Box>
            <Grid>
              <h2>Firma aquí</h2>
              <Box sx={{ borderRadius: 2, m: 3 }}>
                <SignatureCanvas
                  ref={sigCanvas}
                  penColor="black"
                  backgroundColor="grey"
                  canvasProps={{
                    backgroundColororder: "red",
                    width: 300,
                    height: 200,
                    className: "signature-canvas",
                  }}
                />
              </Box>
            </Grid>
            <Grid xs={12}>
              <Grid item>
                <button onClick={clear}>Limpiar</button>
              </Grid>
              <Grid item>
                <button onClick={save}>Guardar</button>
              </Grid>
            </Grid>
            <Grid xs={12}>
              <GetSignature />
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Signature;
