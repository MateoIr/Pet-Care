import { useEffect, useState } from "react";
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

const CustomSelectTectBox2 = ({ register, name, list, valueKey, labelKey }) => {
  const [defaltType, setDefaultType] = useState("");

  const handleChange = (event) => {
    setDefaultType(event.target.value);
  };

  useEffect(() => {
    if (list && list.length > 0) {
      setDefaultType(list[0][valueKey]);
    }
  }, [list, valueKey]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <CustomSelect
        {...register(name)}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={defaltType}
        label="User"
        onChange={handleChange}
        variant="outlined"
      >
        {list?.map((race) => (
          <MenuItem key={race[valueKey]} value={race[valueKey]}>
            {race[labelKey]}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default CustomSelectTectBox2;
