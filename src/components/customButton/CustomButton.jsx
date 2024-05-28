import PropTypes from "prop-types";
import { Button } from "@mui/material";
import "./CustomButton.css";

const CustomButton = ({ text, onClick }) => {
  return (
    <Button variant="contained" className="BtnStyle" onClick={onClick}>
      {text}
    </Button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomButton;
