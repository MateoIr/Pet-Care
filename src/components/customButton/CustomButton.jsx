import PropTypes from "prop-types";
import "./CustomButton.css";
import { LoadingButton } from "@mui/lab";

const CustomButton = ({ text, onClick, isLoading }) => {
  return (
    <LoadingButton
      variant="contained"
      className="BtnStyle"
      loading={isLoading}
      onClick={onClick}
    >
      {!isLoading ? text : ""}
    </LoadingButton>
  );
};

CustomButton.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default CustomButton;
