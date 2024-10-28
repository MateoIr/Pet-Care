import { Alert, Box, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import CustomNavBar from "../../components/customNavBar/CustomNavBar";
import Signature from "../signature/Signature";
import useSelectedPet from "../../hooks/pet/useSelectedPet";
import useUpdatePet from "../../hooks/pet/useUpdatePet";

const SignaturePage = ({ setUser }) => {
  const { id } = useParams();
  const { error, isLoading, petSelected } = useSelectedPet(id);

  return (
    <Grid
      container
      sx={{
        textAlign: "center",
        height: "100vh",
        alignItems: "start",
      }}
    >
      <Grid item xs={12} sm={2}>
        <Box>
          <CustomNavBar setUser={setUser} />
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={10}
        sx={{
          height: "90%",
        }}
      >
        <Box className="titlePage">Consentimiento </Box>
        <Box>CONFORMIDAD DE INGRESO:</Box>
        <ol>
          <li>
            Todo animal que ingresa a la Guardería debe estar vacunado contra
            Rabia, Moquillo, Hepatitis, Parvovirus y Adenovirus, así como
            desparasitado interna y externamente a la fecha de ingreso.
          </li>
          <br />
          <li>
            Se requerirá la aplicación de una (01) pipeta contra pulgas y
            garrapatas, moscas y mosquitos (acorde al peso del animal) al
            momento del ingreso del mismo, con excepción de aquellos casos en
            que la aplicación se hubiese efectuado en los últimos 30 (treinta)
            días.
          </li>
          <br />
          <li>
            Es responsabilidad del Dueño conocer período y celo de sus animales,
            el mismo deberá informarlo con antelación al ingreso, de lo
            contrario la Guardería Canina no se hará responsable en caso de que
            la perra quede preñada.
          </li>
          <br />
          <li>
            Los medicamentos de rutina serán administrados conforme indicaciones
            precisas (dosis y horarios), prescriptas por el médico veterinario.
          </li>
          <br />
          <li>
            El compromiso de la Guardería Canina es la alimentación y cuidados
            durante la permanencia del Pensionado. La Guardería no se hace
            responsable por el contagio de enfermedades infectocontagiosas o la
            aparición de alguna que hubiese tenido en periodo de incubación al
            momento de ingresar al Pensionado.
          </li>
          <br />
          <li>
            La Guardería se reserva el derecho de Admisión sobre razas
            peligrosas, perros agresivos o hembras en celo. Se encuentra
            reservada el derecho de llamar al Dueño y/o contacto de emergencia a
            los fines de recoger al animal que en cualquier momento de su
            estadía presente comportamiento agresivo o violento hacia otros
            animales o personas.
          </li>
          <br />
          <li>
            En caso de enfermedad del animal y no poder dar aviso al Dueño o al
            Contacto de Emergencia, el Médico Veterinario de la Guardería Canina
            efectuará el tratamiento médico-quirúrgico más aconsejable y el
            Dueño aceptará los resultados del mismo. El importe de todos los
            gastos será por cuenta del Dueño.
          </li>
          <br />
          <li>
            El Dueño hace constar por escrito en este mismo documento el tiempo
            de estadía de la pensión, debiendo abonar por adelantado el 50% del
            importe total, mismo que se conviene que será de ___ por día
            calendario, entendiéndose que un nuevo día se configura a partir de
            las 00:00 hs.
          </li>
          <br />
          <li>
            En caso de imposibilidad de retirar el animal en el día pactado, el
            Dueño deberá dar aviso por escrito o por vía telefónica de la
            extensión de la pensión, al tiempo que abonará el importe adicional
            correspondiente al tiempo extra. La extensión de la estadía quedará
            sujeta a la disponibilidad de lugar en la Guardería Canina.
          </li>
          <br />
          <li>
            Si pasado el tiempo estipulado del período de pensión no se
            presentara el Dueño a recoger al Pensionado y no diera aviso, la
            responsabilidad de la Guardería Canina se extinguirá totalmente de
            forma automática, dejando a la Guardería Canina en la libertad de
            decidir el futuro del animal bajo su cuidado. En caso de no
            retirarlo, incurrirá en violación a la LEY 14.436 de Protección al
            Animal, por abandono del mismo, librando a la Guardería Canina de
            toda responsabilidad legal.
          </li>
          <br />
          <li>
            La alimentación será a base de alimentos balanceados comerciales
            proporcionados por el Dueño, no aceptando la Guardería Canina dar
            alimentos especiales o caseros, salvo en el caso de que sean
            proporcionados y específicamente indicados por el Dueño.
          </li>
          <br />
          <li>
            El estrés que sufre el animal por el cambio de espacio, rutinas y
            actividades puede desencadenar episodios de Enteritis de etiología
            multifactorial, disminución del apetito, cansancio y/o decaimiento.
            En caso de padecer uno o más síntomas se le dará aviso al Dueño.
          </li>
          <br />
          <li>
            La Guardería Canina se compromete a la vigilancia y al cuidado del
            Pensionado que se encontrará en permanente contacto con otros
            animales, libre de caniles y jaulas. El Dueño, presta consentimiento
            informado por medio de la presente y asume los riesgos que conlleva
            la libertad de los animales en los espacios libres y cerrados,
            dejando libre de responsabilidad a la Guardería Canina de cualquier
            daño que por caso fortuito o fuerza mayor pudiera ocasionarse a raíz
            de las reacciones espontáneas e instintivas en el comportamiento del
            animal.
          </li>
          <br />
        </ol>
        <Grid xs={12}>
          <h2>
            Dueño: {petSelected?.idcliente.idpersona?.nombre}{" "}
            {petSelected?.idcliente.idpersona?.apellido}
          </h2>
        </Grid>
        <Grid xs={12}>
          {" "}
          <h2>Mascota: {petSelected?.nombre}</h2>{" "}
        </Grid>
        <Grid xs={12}>
          <Signature id={id} idconst={petSelected?.idconsentimiento} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignaturePage;
