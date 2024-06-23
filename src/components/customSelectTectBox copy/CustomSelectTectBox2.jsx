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
  selectedItem,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  // Maneja el cambio de selección
  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (filtro) {
      filtro(newValue);
    }
  };

  // Inicializa selectedValue con selectedItem si está presente, sino, lo deja vacío
  useEffect(() => {
    if (selectedItem) {
      setSelectedValue(selectedItem);
    } else {
      setSelectedValue("");
    }
  }, [selectedItem]);

  // Restablece selectedValue a una cadena vacía si la lista cambia
  useEffect(() => {
    if (list && list.length === 0) {
      setSelectedValue("");
    }
  }, [list]);

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <CustomSelect
        {...register(name)}
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedValue}
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
