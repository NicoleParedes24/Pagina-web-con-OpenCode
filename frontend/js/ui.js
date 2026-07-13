/**
 * ui.js — Manejo de la interfaz de usuario
 */

const UI = {
  // Elementos del DOM
  form: document.getElementById('activity-form'),
  formTitle: document.getElementById('form-title'),
  inputId: document.getElementById('activity-id'),
  inputTitulo: document.getElementById('activity-titulo'),
  inputDescripcion: document.getElementById('activity-descripcion'),
  inputFecha: document.getElementById('activity-fecha'),
  inputEstado: document.getElementById('activity-estado'),
  errorTitulo: document.getElementById('error-titulo'),
  errorFecha: document.getElementById('error-fecha'),
  btnGuardar: document.getElementById('btn-guardar'),
  btnCancelar: document.getElementById('btn-cancelar'),
  activitiesList: document.getElementById('activities-list'),
  emptyState: document.getElementById('empty-state'),
  toastContainer: document.getElementById('toast-container'),
  modalOverlay: document.getElementById('modal-overlay'),
  modalClose: document.getElementById('modal-close'),
  modalTitle: document.getElementById('modal-title'),
  modalDescripcion: document.getElementById('modal-descripcion'),
  modalFecha: document.getElementById('modal-fecha'),
  modalEstado: document.getElementById('modal-estado'),
  statTotal: document.getElementById('stat-total'),
  statPendientes: document.getElementById('stat-pendientes'),
  statCompletadas: document.getElementById('stat-completadas'),
  filtersContainer: document.getElementById('filters'),

  /**
   * Mostrar toast de notificación
   */
  mostrarToast(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    this.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  /**
   * Actualizar las estadísticas del dashboard
   */
  actualizarEstadisticas(actividades) {
    const total = actividades.length;
    const pendientes = actividades.filter(a => a.estado === 'Pendiente').length;
    const completadas = actividades.filter(a => a.estado === 'Completada').length;

    this.statTotal.textContent = total;
    this.statPendientes.textContent = pendientes;
    this.statCompletadas.textContent = completadas;
  },

  /**
   * Validar el formulario
   */
  validarFormulario() {
    let valido = true;

    // Validar título
    if (!this.inputTitulo.value.trim()) {
      this.inputTitulo.classList.add('error');
      this.errorTitulo.textContent = 'El título es obligatorio';
      valido = false;
    } else {
      this.inputTitulo.classList.remove('error');
      this.errorTitulo.textContent = '';
    }

    // Validar fecha
    if (!this.inputFecha.value) {
      this.inputFecha.classList.add('error');
      this.errorFecha.textContent = 'La fecha es obligatoria';
      valido = false;
    } else {
      this.inputFecha.classList.remove('error');
      this.errorFecha.textContent = '';
    }

    return valido;
  },

  /**
   * Limpiar el formulario
   */
  limpiarFormulario() {
    this.form.reset();
    this.inputId.value = '';
    this.formTitle.textContent = 'Nueva Actividad';
    this.btnGuardar.textContent = 'Guardar';
    this.btnCancelar.style.display = 'none';
    this.inputTitulo.classList.remove('error');
    this.inputFecha.classList.remove('error');
    this.errorTitulo.textContent = '';
    this.errorFecha.textContent = '';
  },

  /**
   * Rellenar el formulario para editar
   */
  rellenarFormulario(actividad) {
    this.inputId.value = actividad.id;
    this.inputTitulo.value = actividad.titulo;
    this.inputDescripcion.value = actividad.descripcion || '';
    this.inputFecha.value = actividad.fecha;
    this.inputEstado.value = actividad.estado;
    this.formTitle.textContent = 'Editar Actividad';
    this.btnGuardar.textContent = 'Actualizar';
    this.btnCancelar.style.display = 'inline-flex';

    // Limpiar errores
    this.inputTitulo.classList.remove('error');
    this.inputFecha.classList.remove('error');
    this.errorTitulo.textContent = '';
    this.errorFecha.textContent = '';

    // Scroll al formulario
    this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  /**
   * Renderizar la lista de actividades
   */
  renderizarActividades(actividades, filtro = 'Todas') {
    // Aplicar filtro
    let filtradas = actividades;
    if (filtro === 'Pendiente') {
      filtradas = actividades.filter(a => a.estado === 'Pendiente');
    } else if (filtro === 'Completada') {
      filtradas = actividades.filter(a => a.estado === 'Completada');
    }

    // Mostrar estado vacío o lista
    if (filtradas.length === 0) {
      this.emptyState.style.display = 'block';
      this.activitiesList.innerHTML = '';
      return;
    }

    this.emptyState.style.display = 'none';

    this.activitiesList.innerHTML = filtradas.map(actividad => `
      <div class="activity-card ${actividad.estado === 'Completada' ? 'completada' : ''}" data-id="${actividad.id}">
        <div class="activity-card-header">
          <span class="activity-card-titulo">${this.escaparHTML(actividad.titulo)}</span>
          <span class="activity-badge ${actividad.estado === 'Pendiente' ? 'badge-pendiente' : 'badge-completada'}">
            ${actividad.estado}
          </span>
        </div>
        ${actividad.descripcion ? `<p class="activity-card-descripcion">${this.escaparHTML(actividad.descripcion)}</p>` : ''}
        <span class="activity-card-fecha">&#128197; ${this.formatearFecha(actividad.fecha)}</span>
        <div class="activity-card-buttons">
          <button class="btn btn-sm btn-warning" onclick="App.toggleEstado('${actividad.id}')" title="Cambiar estado">
            ${actividad.estado === 'Pendiente' ? '&#9989; Completar' : '&#9203; Pendiente'}
          </button>
          <button class="btn btn-sm btn-primary" onclick="App.editarActividad('${actividad.id}')" title="Editar">
            &#9998; Editar
          </button>
          <button class="btn btn-sm btn-danger" onclick="App.eliminarActividad('${actividad.id}')" title="Eliminar">
            &#10006; Eliminar
          </button>
        </div>
      </div>
    `).join('');
  },

  /**
   * Abrir modal con detalle de actividad
   */
  abrirModal(actividad) {
    this.modalTitle.textContent = actividad.titulo;
    this.modalDescripcion.textContent = actividad.descripcion || 'Sin descripción';
    this.modalFecha.textContent = this.formatearFecha(actividad.fecha);
    this.modalEstado.textContent = actividad.estado;
    this.modalEstado.style.color = actividad.estado === 'Completada' ? 'var(--success)' : 'var(--warning)';
    this.modalOverlay.classList.add('visible');
  },

  /**
   * Cerrar modal
   */
  cerrarModal() {
    this.modalOverlay.classList.remove('visible');
  },

  /**
   * Formatear fecha a formato legible
   */
  formatearFecha(fechaStr) {
    const [year, month, day] = fechaStr.split('-');
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${parseInt(day)} de ${meses[parseInt(month) - 1]} de ${year}`;
  },

  /**
   * Escapar HTML para prevenir XSS
   */
  escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  },

  /**
   * Actualizar botones de filtro activos
   */
  actualizarFiltrosActivo(filtro) {
    this.filtersContainer.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filtro);
    });
  }
};
