import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
  },
  "& .MuiOutlinedInput-root": {
    "&:hover fieldset": {
      borderColor: "grey",
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey",
    },
  },
});

const CustomTextBox = ({ type, register, name }) => {
  return (
    <Box
      component="form"
      noValidate
      sx={{
        display: "grid",
        width: "100%",
        gap: 2,
      }}
    >
      <CssTextField
        id={name}
        variant="outlined"
        {...register(name)}
        type={type}
        InputProps={{
          style: {
            height: "38px",
            backgroundColor: "#d9d9d9",
            width: "100%",
            pl: 2,
          },
        }}
      />
    </Box>
  );
};

export default CustomTextBox;
