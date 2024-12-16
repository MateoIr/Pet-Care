import {
  Button,
  Checkbox,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import CustomButton from "../../components/customButton/CustomButton";
import CustomTextBox from "../../components/customTextBox/CustomTextBox";
import CustomSelectTectBox2 from "../../components/customSelectTectBox copy/CustomSelectTectBox2";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useGetServices from "../../hooks/turn/useGetServices";
import { useRegisterTurno } from "../../hooks/turn/useRegisterTurno";
import useGetAllCustomer from "../../hooks/customer/useGetAllCustomer";
import useGetAnimal from "../../hooks/pet/getAllPets";
import useGetStates from "../../hooks/turn/useGetStates";
import useSelectedTurn from "../../hooks/turn/useSelectedTurn";
import useSelectedTurnServices from "../../hooks/turn/useSelectedTurnServices";
import useUpdateTurn from "../../hooks/turn/useUpdateTurn";
import { useParams } from "react-router-dom";

function not(a, b) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a, b) {
  return a.filter((value) => b.includes(value));
}
const UpdateWalk = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { estados } = useGetStates();

  const [servicios, setServicios] = useState([]);
  const { data, createProduct } = useGetServices({ id: 4 });
  useEffect(() => {
    // Solo llamamos a createProduct si aún no tenemos datos
    if (!data || data.length === 0) {
      createProduct({ id: 4 });
    }

    // Solo actualizamos los servicios si `data` es válida
    if (data && data.length > 0) {
      setServicios(data);
      setLeft(data);
    }
  }, [data]); // Dependemos solo de `data`
  const today = new Date().setHours(0, 0, 0, 0); // Eliminar la parte de la hora para comparar solo la fecha

  const schema = yup.object().shape({
    date: yup.string().required("ingrese un valor"),
    scheduleFrom: yup.string().required("ingrese un valor"),
    scheduleUntil: yup
      .string()
      .required("ingrese un valor")
      .test(
        "is-greater",
        "El horario de salida debe ser posterior al de entrada",
        function (value) {
          const { scheduleFrom } = this.parent; // Accedemos al valor de 'scheduleFrom'
          return value > scheduleFrom; // Validamos que 'scheduleUntil' sea mayor que 'scheduleFrom'
        }
      ),
    pet: yup.string().required("ingrese un valor"),
    state: yup.string().required("ingrese un valor"),
    service: yup.string(),
    formadepago: yup.string(),
    descripcion: yup.string(),
  });

  const {
    register,
    handleSubmit,
    setValue: defineValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { id } = useParams();
  const { turnSelected } = useSelectedTurn(id);
  const { servicesSelected } = useSelectedTurnServices(id);

  const { clientes } = useGetAllCustomer();
  const { pet: mascotas } = useGetAnimal();

  const [owner, setOwner] = useState(null);
  const [filteredPets, setFilteredPets] = useState([]);

  useEffect(() => {
    if (owner != null) {
      const filtered = mascotas.filter((mascota) => mascota.idduenio === owner);
      setFilteredPets(filtered);
      //console.log("mascotas filtradas: ",filtered);
    } else {
      setFilteredPets(mascotas);
    }
  }, [owner, mascotas]);

  const [turnoExist, setTurnoExist] = useState(null);
  const { isLoading, createTurno, error } = useRegisterTurno({
    setTurnoExist,
  });
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 3]);
  const [right, setRight] = useState([]);

  useEffect(() => {
    // Filtrar los servicios que no están en right para mantener el estado de left actualizado
    const filteredLeft = servicios.filter(
      (service) => !right.some((r) => r.id === service.id)
    );
    setLeft(filteredLeft);
  }, [right, servicios]); // Dependemos de right y servicios

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

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

  useEffect(() => {
    if (turnSelected) {
      defineValue("id", turnSelected?.id || "");
      defineValue("date", turnSelected?.fechaturno || "");
      defineValue("pet", turnSelected?.idmascota.id || "");
      defineValue("scheduleFrom", turnSelected?.horarioturnodesde || "");
      defineValue("scheduleUntil", turnSelected?.horarioturnohasta || "");
      defineValue("state", turnSelected?.idestado.id || "");
      defineValue("cost", turnSelected?.costototal || "");
      defineValue("formadepago", turnSelected?.formadepago || "");
      defineValue("descripcion", turnSelected?.descripcion || "");
      //setValue("service",turnSelected?.iddetallepedido || "");
    }
    // Aquí transformamos servicesSelected para que tenga la estructura correcta
    if (servicesSelected && servicesSelected.length > 0) {
      const transformedServices = servicesSelected.map((service) => ({
        id: service.tipoServicio.id,
        nombre: service.tipoServicio.nombre,
        // Puedes agregar más campos si es necesario
      }));

      setRight(transformedServices);
      //setChecked(transformedServices); // Marcar como checked
    }
  }, [turnSelected, servicesSelected, defineValue]);

  const { updateTurn } = useUpdateTurn();

  const onSubmit = (data) => {
    defineValue("service", right);
    //console.log(data);

    const {
      id,
      date,
      pet,
      scheduleFrom,
      scheduleUntil,
      state,
      formadepago,
      descripcion,
    } = data;

    const service = right;
    //console.log("servicios_ ",service);
    const turno = {
      id,
      date,
      pet,
      scheduleFrom,
      scheduleUntil,
      service,
      state,
      formadepago,
      descripcion,
      typeturno: 4,
    };
    updateTurn(turno);
  };

  const customList = (items) => (
    <Paper sx={{ width: "auto", height: "auto", overflow: "initial" }}>
      <List dense component="div" role="list">
        {items.map((item) => {
          const labelId = `transfer-list-item-${item.id}-label`;

          return (
            <ListItemButton
              key={item.id}
              role="listitem"
              onClick={handleToggle(item)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(item)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              {/* Aquí pintamos el campo "name" del servicio */}
              <ListItemText id={labelId} primary={item.nombre} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      sx={{
        alignItems: "start",
        width: { xs: "90%" },
      }}
      rowGap={2}
    >
      <Grid item xs={6} md={3} className="textInput">
        Fecha de turno:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomTextBox type="date" register={register} name="date" />
        <p className="errorText">{errors.date?.message}</p>
      </Grid>
      <Grid item xs={6} md={3} className="textInput">
        Horario desde:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomTextBox type="time" register={register} name="scheduleFrom" />
        <p className="errorText">{errors.scheduleFrom?.message}</p>
      </Grid>
      <Grid item xs={6} md={3} className="textInput">
        Horario hasta:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomTextBox type="time" register={register} name="scheduleUntil" />
        <p className="errorText">{errors.scheduleUntil?.message}</p>
      </Grid>

      <Grid item xs={6} md={3} className="textInput">
        Dueño:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomSelectTectBox2
          filtro={setOwner}
          register={register}
          name="owner"
          list={clientes}
          valueKey="id"
          labelKey="idpersona.email"
          selectedItem={turnSelected?.idmascota.idcliente.id}
        />
        <p className="errorText">{errors.owner?.message}</p>
      </Grid>

      <Grid item xs={6} md={3} className="textInput">
        Mascota:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomSelectTectBox2
          register={register}
          name="pet"
          list={filteredPets}
          valueKey="id"
          labelKey="nombre"
          selectedItem={turnSelected?.idmascota.id}
        />
        <p className="errorText">{errors.pet?.message}</p>
      </Grid>
      <Grid item xs={6} md={3} className="textInput">
        Estado:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomSelectTectBox2
          register={register}
          name="state"
          list={estados}
          valueKey="id"
          labelKey="descripcion"
          selectedItem={turnSelected?.idestado.id}
        />
        <p className="errorText">{errors.state?.message}</p>
      </Grid>

      <Grid item xs={6} md={3} className="textInput">
        Costo:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomTextBox type="number" register={register} name="cost" disabled />
        <p className="errorText">{errors.cost?.message}</p>
      </Grid>

      <Grid item xs={6} md={3} className="textInput">
        Forma de pago:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomTextBox type="text" register={register} name="formadepago" />
        <p className="errorText">{errors.formadepago?.message}</p>
      </Grid>
      <Grid item xs={6} md={3} className="textInput">
        Descripción:
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomTextBox type="text" register={register} name="descripcion" />
        <p className="errorText">{errors.descripcion?.message}</p>
      </Grid>
      <Grid item xs={12} className="textInput">
        Servicio:
      </Grid>
      <Grid
        container
        spacing={1}
        sx={{ justifyContent: "center", alignItems: "center" }}
      >
        <Grid item xs={4}>
          {customList(left)}
        </Grid>
        <Grid item>
          <Grid container direction="column" sx={{ alignItems: "center" }}>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllRight}
              disabled={left.length === 0}
              aria-label="move all right"
            >
              ≫
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleAllLeft}
              disabled={right.length === 0}
              aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          {customList(right)}
        </Grid>
      </Grid>
      <Grid item xs={6} md={3} className="textInput"></Grid>
      <Grid item xs={6} md={3} sx={{ mb: 2 }}>
        <CustomButton
          onClick={handleSubmit(onSubmit)}
          text="Guardar"
          // isLoading={isLoading}
        />
      </Grid>
    </Grid>
  );
};

export default UpdateWalk;