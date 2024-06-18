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
const CustomTextBox = ({
  onChange,
  type,
  register,
  name,
  placeholder,
  value,
  disabled,
}) => {
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
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        id={name}
        variant="outlined"
        value={value}
        placeholder={placeholder}
        {...register(name)}
        type={type}
        InputLabelProps={{
          shrink: true, // Asegura que la etiqueta no cubra el contenido del campo.
        }}
        InputProps={{
          style: {
            height: "38px",
            backgroundColor: "#d9d9d9",
            width: "100%",
            paddingLeft: "8px",
          },
        }}
      />
    </Box>
  );
};

export default CustomTextBox;
