import {
  Box,
  Button,
  Checkbox,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Tab,
} from "@mui/material";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomButton from "../../components/customButton/CustomButton";
import Hairdressing from "./Hairdressing";
import Vet from "./Vet";
import Calendar from "./Calendar";
import Daycare from "./Daycare";
import fondo from  "../../images/fondo1.png"
import RegisterDaycare from "./RegisterDaycare";

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}

const TrunRegister = ({ setUser }) => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const schema = yup.object().shape({
    matricula: yup.string().required("ingrese un valor"),
    clinics: yup.string().required("ingrese un valor"),
    nombre: yup.string().required("ingrese un valor"),
    apellido: yup.string().required("ingrese un valor"),
    email: yup
      .string()
      .email("debe ingresar un email")
      .required("ingrese un valor"),
    telefono: yup.string().required("ingrese un valor"),
    fechadenacimiento: yup.string().required("ingrese un valor"),
    calle: yup.string().required("ingrese un valor"),
    numCalle: yup.string().required("ingrese un valor"),
    departamento: yup.string(),
    piso: yup.string(),
    barrio: yup.string().required("ingrese un valor"),
    localidad: yup.string().required("ingrese un valor"),
    provincia: yup.string().required("ingrese un valor"),
    pais: yup.string().required("ingrese un valor"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 3]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: "auto", height: "auto", overflow: "initial" }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItemButton
              key={value}
              role="listitem"
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`List item ${value + 1}`} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
  return (
    <>
      <Grid
      
        container
        sx={{
          backgroundImage: `url(${fondo})`, // Corregir aquí
          backgroundSize: 'auto', // Ajusta según necesites (puedes usar 'contain' o un tamaño específico)
          backgroundPosition: 'bottom center', // Coloca la imagen en la parte inferior
          backgroundRepeat: 'no-repeat', // No repetir la imagen
          
          width: "100%",
          alignItems: "start",
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Grid item xs={12} sm={2}>
          <Box>
            <CustomNavBar setUser={setUser} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={10}>
          <Box className="titlePage">Turno / Registrar Turno</Box>
          <Box sx={{ width: "100%", typography: "body1", pl: 0.5 }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  TabIndicatorProps={{
                    style: {
                      backgroundColor: "#805454", // Color del subrayado cuando está seleccionado
                    },
                  }}
                >
                  <Tab
                    label="Guardería"
                    value="1"
                    sx={{
                      color: value === "1" ? "#805454" : "black", // Color del texto en el tab seleccionado
                      "&.Mui-selected": {
                        color: "#805454", // Mantiene el color al estar seleccionado
                      },
                      "&:hover": { color: "#805454" }, // Efecto hover para el tab
                    }}
                  />
                  <Tab
                    label="Veterinaria"
                    value="2"
                    sx={{
                      color: value === "2" ? "#805454" : "black",
                      "&.Mui-selected": {
                        color: "#805454",
                      },
                      "&:hover": { color: "#805454" },
                    }}
                  />
                  <Tab
                    label="Peluquería"
                    value="3"
                    sx={{
                      color: value === "3" ? "#805454" : "black",
                      "&.Mui-selected": {
                        color: "#805454",
                      },
                      "&:hover": { color: "#805454" },
                    }}
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
              <RegisterDaycare /> 
              </TabPanel>
              <TabPanel value="2">
                <Vet></Vet>
              </TabPanel>
              <TabPanel value="3">
                <Hairdressing />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TrunRegister;
