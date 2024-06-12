import React, { useEffect, useState } from "react";
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

const getNestedValue = (obj, path) => {
  return path.split(".").reduce((value, key) => value && value[key], obj);
};

const CustomSelectTectBox2 = ({
  register,
  name,
  list,
  valueKey,
  labelKey,
  filtro,
}) => {
  const [defaultType, setDefaultType] = useState("");

  const handleChange = (event) => {
    setDefaultType(event.target.value);
    if (filtro) {
      filtro(event.target.value);
    }
  };

  useEffect(() => {
    if (list && list.length > 0) {
      setDefaultType(list[0][valueKey]);
    }
  }, [valueKey, list]);

  useEffect(() => {
    setDefaultType("");
  }, [list]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <CustomSelect
        {...register(name)}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={defaultType || ""}
        label={name}
        onChange={handleChange}
        variant="outlined"
      >
        {list?.map((element) => (
          <MenuItem key={element[valueKey]} value={element[valueKey]}>
            {getNestedValue(element, labelKey)}
          </MenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default CustomSelectTectBox2;