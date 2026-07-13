const API_NOTAS = 'http://localhost:3000/notas';

const NotasAPI = {
  async obtenerTodas() {
    const res = await fetch(API_NOTAS);
    if (!res.ok) throw new Error('Error al obtener notas');
    return res.json();
  },

  async crear(datos) {
    const res = await fetch(API_NOTAS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear nota');
    return data;
  },

  async actualizar(id, datos) {
    const res = await fetch(`${API_NOTAS}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al actualizar nota');
    return data;
  },

  async eliminar(id) {
    const res = await fetch(`${API_NOTAS}/${id}`, { method: 'DELETE' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al eliminar nota');
    return data;
  }
};

const BlogApp = {
  notas: [],

  form: null,
  formTitle: null,
  inputId: null,
  inputTitulo: null,
  inputContenido: null,
  errorTitulo: null,
  errorContenido: null,
  btnGuardar: null,
  btnCancelar: null,
  notasList: null,
  emptyState: null,
  notaCount: null,
  modalOverlay: null,
  modalClose: null,
  modalTitle: null,
  modalFecha: null,
  modalContenido: null,
  toastContainer: null,

  init() {
    this.form = document.getElementById('nota-form');
    this.formTitle = document.getElementById('form-title');
    this.inputId = document.getElementById('nota-id');
    this.inputTitulo = document.getElementById('nota-titulo');
    this.inputContenido = document.getElementById('nota-contenido');
    this.errorTitulo = document.getElementById('error-titulo');
    this.errorContenido = document.getElementById('error-contenido');
    this.btnGuardar = document.getElementById('btn-guardar');
    this.btnCancelar = document.getElementById('btn-cancelar');
    this.notasList = document.getElementById('notas-list');
    this.emptyState = document.getElementById('empty-state');
    this.notaCount = document.getElementById('nota-count');
    this.modalOverlay = document.getElementById('modal-overlay');
    this.modalClose = document.getElementById('modal-close');
    this.modalTitle = document.getElementById('modal-title');
    this.modalFecha = document.getElementById('modal-fecha');
    this.modalContenido = document.getElementById('modal-contenido');
    this.toastContainer = document.getElementById('toast-container');

    this.vincularEventos();
    this.cargarNotas();
  },

  vincularEventos() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.guardarNota();
    });

    this.btnCancelar.addEventListener('click', () => {
      this.limpiarFormulario();
    });

    this.modalClose.addEventListener('click', () => {
      this.cerrarModal();
    });

    this.modalOverlay.addEventListener('click', (e) => {
      if (e.target === this.modalOverlay) this.cerrarModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.cerrarModal();
    });
  },

  async cargarNotas() {
    try {
      this.notas = await NotasAPI.obtenerTodas();
      this.renderizarNotas();
    } catch (error) {
      this.mostrarToast('Error al cargar notas', 'error');
    }
  },

  renderizarNotas() {
    const total = this.notas.length;
    this.notaCount.textContent = `${total} nota${total !== 1 ? 's' : ''}`;

    if (total === 0) {
      this.emptyState.style.display = 'block';
      this.notasList.innerHTML = '';
      return;
    }

    this.emptyState.style.display = 'none';

    this.notasList.innerHTML = this.notas.map(nota => `
      <div class="nota-card" onclick="BlogApp.abrirModal('${nota.id}')">
        <div class="nota-card-header">
          <span class="nota-card-titulo">${this.escaparHTML(nota.titulo)}</span>
          <span class="nota-card-fecha">${this.formatearFecha(nota.fechaCreacion)}</span>
        </div>
        <p class="nota-card-contenido">${this.escaparHTML(nota.contenido)}</p>
        <div class="nota-card-buttons">
          <button class="btn btn-sm btn-primary" onclick="event.stopPropagation(); BlogApp.editarNota('${nota.id}')" title="Editar">
            &#9998; Editar
          </button>
          <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); BlogApp.eliminarNota('${nota.id}')" title="Eliminar">
            &#10006; Eliminar
          </button>
        </div>
      </div>
    `).join('');
  },

  async guardarNota() {
    if (!this.validarFormulario()) return;

    const datos = {
      titulo: this.inputTitulo.value.trim(),
      contenido: this.inputContenido.value.trim()
    };

    const id = this.inputId.value;

    try {
      if (id) {
        await NotasAPI.actualizar(id, datos);
        this.mostrarToast('Nota actualizada correctamente');
      } else {
        await NotasAPI.crear(datos);
        this.mostrarToast('Nota publicada correctamente');
      }

      this.limpiarFormulario();
      await this.cargarNotas();
    } catch (error) {
      this.mostrarToast(error.message, 'error');
    }
  },

  editarNota(id) {
    const nota = this.notas.find(n => n.id === id);
    if (!nota) return;

    this.inputId.value = nota.id;
    this.inputTitulo.value = nota.titulo;
    this.inputContenido.value = nota.contenido;
    this.formTitle.textContent = 'Editar Nota';
    this.btnGuardar.textContent = 'Actualizar';
    this.btnCancelar.style.display = 'inline-flex';

    this.inputTitulo.classList.remove('error');
    this.inputContenido.classList.remove('error');
    this.errorTitulo.textContent = '';
    this.errorContenido.textContent = '';

    this.form.scrollIntoView({ behavior: 'smooth', block: 'center' });
  },

  async eliminarNota(id) {
    if (!confirm('Estas seguro de que deseas eliminar esta nota?')) return;

    try {
      await NotasAPI.eliminar(id);
      this.mostrarToast('Nota eliminada correctamente');
      await this.cargarNotas();
    } catch (error) {
      this.mostrarToast(error.message, 'error');
    }
  },

  abrirModal(id) {
    const nota = this.notas.find(n => n.id === id);
    if (!nota) return;

    this.modalTitle.textContent = nota.titulo;
    this.modalFecha.textContent = `Creada: ${this.formatearFecha(nota.fechaCreacion)}`;
    this.modalContenido.textContent = nota.contenido;
    this.modalOverlay.classList.add('visible');
  },

  cerrarModal() {
    this.modalOverlay.classList.remove('visible');
  },

  validarFormulario() {
    let valido = true;

    if (!this.inputTitulo.value.trim()) {
      this.inputTitulo.classList.add('error');
      this.errorTitulo.textContent = 'El titulo es obligatorio';
      valido = false;
    } else {
      this.inputTitulo.classList.remove('error');
      this.errorTitulo.textContent = '';
    }

    if (!this.inputContenido.value.trim()) {
      this.inputContenido.classList.add('error');
      this.errorContenido.textContent = 'El contenido es obligatorio';
      valido = false;
    } else {
      this.inputContenido.classList.remove('error');
      this.errorContenido.textContent = '';
    }

    return valido;
  },

  limpiarFormulario() {
    this.form.reset();
    this.inputId.value = '';
    this.formTitle.textContent = 'Nueva Nota';
    this.btnGuardar.textContent = 'Publicar';
    this.btnCancelar.style.display = 'none';
    this.inputTitulo.classList.remove('error');
    this.inputContenido.classList.remove('error');
    this.errorTitulo.textContent = '';
    this.errorContenido.textContent = '';
  },

  mostrarToast(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;
    toast.textContent = mensaje;
    this.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  },

  formatearFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${fecha.getDate()} de ${meses[fecha.getMonth()]} de ${fecha.getFullYear()}`;
  },

  escaparHTML(texto) {
    const div = document.createElement('div');
    div.textContent = texto;
    return div.innerHTML;
  }
};

document.addEventListener('DOMContentLoaded', () => BlogApp.init());
