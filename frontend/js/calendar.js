/**
 * calendar.js — Manejo del calendario con FullCalendar
 */

const CalendarManager = {
  calendar: null,

  /**
   * Inicializar FullCalendar
   */
  inicializar() {
    const calendarEl = document.getElementById('calendar');

    this.calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      locale: 'es',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      },
      buttonText: {
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        list: 'Lista'
      },
      events: [],
      eventClick: (info) => {
        info.jsEvent.preventDefault();
        const actividad = this.buscarActividad(info.event.id);
        if (actividad) {
          UI.abrirModal(actividad);
        }
      },
      eventDidMount: (info) => {
        info.el.title = info.event.title;
      }
    });

    this.calendar.render();
  },

  /**
   * Actualizar eventos del calendario
   */
  actualizarEventos(actividades) {
    if (!this.calendar) return;

    this.calendar.removeAllEvents();

    const eventos = actividades.map(a => ({
      id: a.id,
      title: a.titulo,
      start: a.fecha,
      backgroundColor: a.estado === 'Completada' ? '#22c55e' : '#f59e0b',
      borderColor: a.estado === 'Completada' ? '#16a34a' : '#d97706',
      textColor: '#fff',
      extendedProps: {
        estado: a.estado,
        descripcion: a.descripcion
      }
    }));

    this.calendar.addEventSource(eventos);
  },

  /**
   * Buscar una actividad por ID en la lista actual
   */
  buscarActividad(id) {
    return App.actividades.find(a => a.id === id) || null;
  }
};
