import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const Signature = ({ setUser }) => {
    const sigCanvas = useRef(null);

    const clear = () => {
      sigCanvas.current.clear();
    };
  
    const save = () => {
      const dataURL = sigCanvas.current.toDataURL();
      console.log(dataURL); // Aquí puedes manejar la firma, por ejemplo, enviarla a un servidor o guardarla localmente
    };
  
    return (
      <div>
        <h2>Firma aquí</h2>
        <SignatureCanvas
          ref={sigCanvas}
          penColor='black'
          canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
        />
        <button onClick={clear}>Limpiar</button>
        <button onClick={save}>Guardar</button>
      </div>
    );
}

export default Signature;