import { Button } from "@mui/material";
import "./CustomButton.css";
const CustomButton = ({ text }) => {
  return (
    <Button variant="contained" className="BtnStyle">
      {text}
    </Button>
  );
};

export default CustomButton;
