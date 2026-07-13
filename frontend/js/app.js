/**
 * app.js — Lógica principal de la aplicación
 */

const App = {
  actividades: [],
  filtroActual: 'Todas',

  /**
   * Inicializar la aplicación
   */
  async init() {
    // Inicializar calendario
    CalendarManager.inicializar();

    // Vincular eventos
    this.vincularEventos();

    // Cargar datos iniciales
    await this.cargarActividades();
  },

  /**
   * Vincular todos los eventos del DOM
   */
  vincularEventos() {
    // Formulario
    UI.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.guardarActividad();
    });

    // Botón cancelar
    UI.btnCancelar.addEventListener('click', () => {
      UI.limpiarFormulario();
    });

    // Filtros
    UI.filtersContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('filter-btn')) {
        this.filtroActual = e.target.dataset.filter;
        UI.actualizarFiltrosActivo(this.filtroActual);
        UI.renderizarActividades(this.actividades, this.filtroActual);
      }
    });

    // Modal cerrar
    UI.modalClose.addEventListener('click', () => {
      UI.cerrarModal();
    });

    UI.modalOverlay.addEventListener('click', (e) => {
      if (e.target === UI.modalOverlay) {
        UI.cerrarModal();
      }
    });

    // Tecla Escape cierra modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') UI.cerrarModal();
    });
  },

  /**
   * Cargar actividades desde la API
   */
  async cargarActividades() {
    try {
      this.actividades = await ActividadesAPI.obtenerTodas();
      UI.renderizarActividades(this.actividades, this.filtroActual);
      UI.actualizarEstadisticas(this.actividades);
      CalendarManager.actualizarEventos(this.actividades);
    } catch (error) {
      UI.mostrarToast('Error al cargar actividades', 'error');
      console.error(error);
    }
  },

  /**
   * Guardar o actualizar una actividad
   */
  async guardarActividad() {
    if (!UI.validarFormulario()) return;

    const datos = {
      titulo: UI.inputTitulo.value.trim(),
      descripcion: UI.inputDescripcion.value.trim(),
      fecha: UI.inputFecha.value,
      estado: UI.inputEstado.value
    };

    const id = UI.inputId.value;

    try {
      if (id) {
        // Actualizar
        await ActividadesAPI.actualizar(id, datos);
        UI.mostrarToast('Actividad actualizada correctamente');
      } else {
        // Crear
        await ActividadesAPI.crear(datos);
        UI.mostrarToast('Actividad creada correctamente');
      }

      UI.limpiarFormulario();
      await this.cargarActividades();
    } catch (error) {
      UI.mostrarToast(error.message, 'error');
    }
  },

  /**
   * Preparar formulario para editar
   */
  editarActividad(id) {
    const actividad = this.actividades.find(a => a.id === id);
    if (!actividad) return;
    UI.rellenarFormulario(actividad);
  },

  /**
   * Eliminar una actividad
   */
  async eliminarActividad(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta actividad?')) return;

    try {
      await ActividadesAPI.eliminar(id);
      UI.mostrarToast('Actividad eliminada correctamente');
      await this.cargarActividades();
    } catch (error) {
      UI.mostrarToast(error.message, 'error');
    }
  },

  /**
   * Cambiar el estado de una actividad
   */
  async toggleEstado(id) {
    try {
      await ActividadesAPI.cambiarEstado(id);
      UI.mostrarToast('Estado actualizado correctamente');
      await this.cargarActividades();
    } catch (error) {
      UI.mostrarToast(error.message, 'error');
    }
  }
};

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => App.init());
