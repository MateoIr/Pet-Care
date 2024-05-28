import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";

// Estilo personalizado para el componente Select
const CustomSelect = styled(Select)({
  "& .MuiInputBase-input": {
    height: "28px",
    backgroundColor: "#d9d9d9",
  },
});

const CustomSelectTectBox = ({ register, name }) => {
  const [userType, setUserType] = useState(2);

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">tipo de usuario</InputLabel>
      <CustomSelect
        {...register(name)}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={userType}
        label="User"
        onChange={handleChange}
        variant="outlined"
      >
        <MenuItem value={1}>Admin</MenuItem>
        <MenuItem value={2}>User</MenuItem>
      </CustomSelect>
    </FormControl>
  );
};

export default CustomSelectTectBox;
