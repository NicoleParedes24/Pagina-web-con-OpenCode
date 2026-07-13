/**
 * api.js — Capa de comunicación con la API REST
 */

const API_URL = 'http://localhost:3000/actividades';

const ActividadesAPI = {
  /**
   * Obtener todas las actividades
   */
  async obtenerTodas() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Error al obtener actividades');
    return res.json();
  },

  /**
   * Crear una nueva actividad
   */
  async crear(datos) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al crear actividad');
    return data;
  },

  /**
   * Actualizar una actividad existente
   */
  async actualizar(id, datos) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al actualizar actividad');
    return data;
  },

  /**
   * Cambiar el estado de una actividad
   */
  async cambiarEstado(id) {
    const res = await fetch(`${API_URL}/${id}/estado`, {
      method: 'PATCH'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al cambiar estado');
    return data;
  },

  /**
   * Eliminar una actividad
   */
  async eliminar(id) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Error al eliminar actividad');
    return data;
  }
};
