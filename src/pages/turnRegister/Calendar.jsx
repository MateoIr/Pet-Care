import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css"; // Importar estilos para el modal y el calendario
import useGetDaycareServices from "../../hooks/turn/useGetDaycareServices"; // Hook para obtener los eventos


const Calendar = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
{/* 
  const events = [
    {
      title: "Cita 1",
      start: "2024-10-10T10:00:00",
      end: "2024-10-10T11:00:00",
      description: "Descripción de la Cita 1",
    },
    {
      title: "Cita 2",
      start: "2024-10-11T14:00:00",
      end: "2024-10-11T15:00:00",
      description: "Descripción de la Cita 2",
    },
    {
      title: "Cita 3",
      start: "2024-10-12T09:00:00",
      end: "2024-10-12T10:00:00",
      description: "Descripción de la Cita 3",
    },
  ];
*/}
// Obtener los eventos desde el hook
const { turnos, isLoading, error } = useGetDaycareServices(); // Llamada al API

// Transformar los datos del API al formato que FullCalendar necesita
//console.log('Eventos API:', turnos);

const transformEvents = (turnos) => {
  return turnos.map((event) => ({
    title: `${event.idmascota.nombre} - ${event.idtipoTurno.nombreTurno}`, // Título combinado de la mascota y el tipo de turno
    start: `${event.fechaturno}T${event.horarioturnodesde}`, // Fecha y hora de inicio en formato ISO 8601
    end: `${event.fechaturno}T${event.horarioturnohasta}`, // Fecha y hora de fin en formato ISO 8601
    description: `Turno de ${event.idmascota.nombre} con el servicio ${event.idtipoTurno.nombreTurno}.\nEstado: ${event.idestado.descripcion}\nCosto total: $${event.costototal}`,
  }));
};

const transformedEvents = turnos && turnos.length > 0 ? transformEvents(turnos) : [];
//console.log('Eventos transformados:', transformedEvents);


  const handleEventClick = (eventInfo) => {
    setSelectedEvent(eventInfo.event);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedEvent(null);
  };

  return (
    <div>
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
        eventClick={handleEventClick}
      />

      {/* Modal para mostrar información del evento */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedEvent.title}</h2>
            <p>
              <strong>Inicio:</strong> {selectedEvent.start.toString()}
            </p>
            <p>
              <strong>Fin:</strong> {selectedEvent.end.toString()}
            </p>
            <p>
              <strong>Descripción:</strong>{" "}
              {selectedEvent.extendedProps.description}
            </p>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
