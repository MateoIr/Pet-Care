import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Importar estilos para el modal y el calendario
import useGetDaycareServices from "../../hooks/turn/useGetDaycareServices"; // Hook para obtener los eventos
import { Link } from 'react-router-dom';
import esLocale from "@fullcalendar/core/locales/es"
import CustomButton from "../../components/customButton/CustomButton";
import { Box, Grid } from "@mui/material";

const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

// Obtener los eventos desde el hook
const { turnos, isLoading, error } = useGetDaycareServices(); // Llamada al API

// Transformar los datos del API al formato que FullCalendar necesita
//console.log('Eventos API:', turnos);
const transformEvents = (turnos) => {
  return turnos.map((event) => ({
      idturno: `${event.id}`.trim(),
      idtipo: `${event.idtipoTurno.id}`.trim(),
      nombre:`${event.idmascota.nombre} para ${event.idtipoTurno.nombreTurno} a las ${event.horarioturnodesde} `,
      numero:`${event.idmascota.idcliente.idpersona.telefono}`,
      title: `${event.idmascota.nombre} - ${event.idtipoTurno.nombreTurno}`, // Título combinado de la mascota y el tipo de turno
      start: `${event.fechaturno}T${event.horarioturnodesde}`, // Fecha y hora de inicio en formato ISO 8601
      end: `${event.fechaturno}T${event.horarioturnohasta}`, // Fecha y hora de fin en formato ISO 8601
      horario: event.idtipoTurno.id==1?`${event.fechaturno} \n Horario de ingreso: ${event.horarioturnodesde} \n Día de egreso: ${event.idficha.fechaegreso} Horario de salida: ${event.horarioturnohasta}`:
      `${event.fechaturno} \n Horario de inicio: ${event.horarioturnodesde} \n Horario de fin: ${event.horarioturnohasta}`,
      description: `Turno de ${event.idmascota.nombre} con el servicio ${event.idtipoTurno.nombreTurno}.\nEstado: ${event.idestado.descripcion}\nCosto total: $${event.costototal}`,
      backgroundColor: event.idtipoTurno.id==1?`#e5af3d`: event.idtipoTurno.id==2?`#66a2d1`:`#378006`,
      borderColor:event.idtipoTurno.id==1?`#e5af3d`: event.idtipoTurno.id==2?`#66a2d1`:`#378006`,
    }
  ));
};

const transformedEvents = turnos && turnos.length > 0 ? transformEvents(turnos) : [];
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
        events={transformedEvents}// Cargar los eventos transformados
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
              <strong>Descripción:</strong>{" "}
              {selectedEvent.extendedProps.description}
            </p>
            <button onClick={closeModal}>Cerrar</button>
            <Link to={`/turn/updateTurn/${selectedEvent.extendedProps.idtipo}/${selectedEvent.extendedProps.idturno}`}>
            <button>Modificar</button>
            </Link>            
            <button onClick={() => {
              const phoneNumber = `+549${selectedEvent.extendedProps.numero}`; // Número de teléfono en formato internacional sin el "+" (por ejemplo, "5491123456789" para Argentina)
              const message = encodeURIComponent(`Hola, le recordamos del turno de ${selectedEvent.extendedProps.nombre} .`);
              const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
              window.location.href = whatsappUrl;}}>
              WhatsApp
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
