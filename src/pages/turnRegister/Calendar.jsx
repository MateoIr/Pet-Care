import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Importar estilos para el modal y el calendario
import useGetDaycareServices from "../../hooks/turn/useGetDaycareServices"; // Hook para obtener los eventos
import { Link } from "react-router-dom";
import esLocale from "@fullcalendar/core/locales/es";
import CustomButton from "../../components/customButton/CustomButton";
import { Box, Grid } from "@mui/material";

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { turnos, isLoading, error } = useGetDaycareServices(); // Llamada al API

  const transformEvents = (turnos) => {
    return turnos.flatMap((event) => {
      const observaciones = event.turno.descripcion
        ? `\n Observaciones: ${event.turno.descripcion}`
        : "";
      const formaDePago = event.turno.formadepago
        ? `\n Forma de pago: ${event.turno.formadepago}`
        : "";
      // Evento principal (Ingreso)
      const mainEvent = {
        idturno: `${event.turno.id}`.trim(),
        idtipo: `${event.turno.idtipoTurno.id}`.trim(),
        nombre: `${event.turno.idmascota.nombre} para ${event.turno.idtipoTurno.nombreTurno} a las ${event.turno.horarioturnodesde} `,
        numero: `${event.turno.idmascota.idcliente.idpersona.telefono}`,
        title: `${event.turno.idmascota.nombre} - ${event.turno.idtipoTurno.nombreTurno}`, // Título combinado de la mascota y el tipo de turno
        start: `${event.turno.fechaturno}T${event.turno.horarioturnodesde}`, // Fecha y hora de inicio en formato ISO 8601
        end: `${event.turno.fechaturno}T${event.turno.horarioturnohasta}`, // Fecha y hora de fin en formato ISO 8601
        horario:
          event.turno.idtipoTurno.id == 1
            ? `${event.turno.fechaturno} \n Horario de ingreso: ${event.turno.horarioturnodesde} \n Día de salida: ${event.turno.idficha.fechaegreso} Horario de salida: ${event.turno.horarioturnohasta}`
            : `${event.turno.fechaturno} \n Horario de inicio: ${event.turno.horarioturnodesde} \n Horario de fin: ${event.turno.horarioturnohasta}`,
        description: event.turno.idtipoTurno.id
          ? `Turno de ${event.turno.idmascota.nombre} con el servicio ${
              event.turno.idtipoTurno.nombreTurno
            }. 
                   \n Estado: ${event.turno.idestado.descripcion} 
                   \n Costo total: $${event.turno.costototal} 
                   \n Detalle de turno: ${event.detalles.map(
                     (detalle) => detalle.tipoServicio.nombre
                   )}
                   \n Dirección: ${
                     event.turno.idmascota.idcliente.idpersona.iddireccion.calle
                   } ${
              event.turno.idmascota.idcliente.idpersona.iddireccion.numero
            }, ${event.turno.idmascota.idcliente.idpersona.iddireccion.barrio}
                    ${formaDePago}${observaciones}`
          : `Turno de ${event.turno.idmascota.nombre} con el servicio ${
              event.turno.idtipoTurno.nombreTurno
            }. 
                   \n Estado: ${event.turno.idestado.descripcion} 
                   \n Costo total: $${event.turno.costototal} 

                   \n Detalle de turno: ${event.detalles.map(
                     (detalle) => detalle.tipoServicio.nombre
                   )}`,
        backgroundColor:
          event.turno.idtipoTurno.id == 1
            ? `#e5af3d`
            : event.turno.idtipoTurno.id == 2
            ? `#66a2d1`
            : event.turno.idtipoTurno.id == 3
            ? `#378006`
            : `#A100BD`,
        borderColor:
          event.turno.idtipoTurno.id == 1
            ? `#e5af3d`
            : event.turno.idtipoTurno.id == 2
            ? `#66a2d1`
            : event.turno.idtipoTurno.id == 3
            ? `#378006`
            : "#A100BD",
      };

      // Evento adicional (Egreso)
      const egresoEvent =
        event.turno.idtipoTurno.id == 1
          ? {
              idturno: `${event.turno.id}`.trim(), // Mismo id para ingreso y egreso
              idtipo: `${event.turno.idtipoTurno.id}`.trim(),
              tipoEvento: "egreso", // Propiedad adicional para distinguir eventos
              title: `${event.turno.idmascota.nombre} - Salida Guardería`,
              horario: `${event.turno.idficha.fechaegreso} Horario de salida: ${event.turno.horarioturnohasta}`,
              start: `${event.turno.idficha.fechaegreso}T${event.turno.horarioturnohasta}`,
              end: `${event.turno.idficha.fechaegreso}T${event.turno.horarioturnohasta}`,
              description: `Egreso programado para ${event.turno.idmascota.nombre} el ${event.turno.idficha.fechaegreso} a las ${event.turno.horarioturnohasta}.
                    \n Servicio: ${event.turno.idtipoTurno.nombreTurno} 
                   \n Estado: ${event.turno.idestado.descripcion} 
                   ${formaDePago}${observaciones}`,
              backgroundColor: "#FFA07A", // Color específico para egreso
              borderColor: "#FF4500",
            }
          : null;

      // Devuelve el evento principal y el de egreso si aplica
      return egresoEvent ? [mainEvent, egresoEvent] : [mainEvent];
    });
  };

  const transformedEvents =
    turnos && turnos.length > 0 ? transformEvents(turnos) : [];
  //console.log('Eventos transformados:', transformedEvents);

  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setModalOpen(true);
    console.log(eventInfo);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
      <Grid item xs={12} sm={12} className="calendarContainer">
        <Link to="/turn/register">
          <CustomButton text="Registrar turno"></CustomButton>
        </Link>
      </Grid>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"auto"} // Ajustar la altura para que se ajuste al contenido
        events={transformedEvents} // Cargar los eventos transformados
        //eventColor= '#378006'
        locale={esLocale} // Establece el idioma en español
        eventClick={handleEventClick}
      />

      {/* Modal para mostrar información del evento */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Turno:</strong> {selectedEvent.extendedProps.horario}
            </p>
            <p>
              <strong style={{ whiteSpace: "pre-wrap" }}>
                Descripción: {selectedEvent.extendedProps.description}
              </strong>{" "}
            </p>
            <button onClick={closeModal}>Cerrar</button>
            <Link
              to={`/turn/updateTurn/${selectedEvent.extendedProps.idtipo}/${selectedEvent.extendedProps.idturno}`}
            >
              <button>Modificar</button>
            </Link>
            <button
              onClick={() => {
                const phoneNumber = `+549${selectedEvent.extendedProps.numero}`; // Número de teléfono en formato internacional sin el "+" (por ejemplo, "5491123456789" para Argentina)
                const message = encodeURIComponent(
                  `Hola, le recordamos del turno de ${selectedEvent.extendedProps.nombre} .`
                );
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
                window.location.href = whatsappUrl;
              }}
            >
              WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
