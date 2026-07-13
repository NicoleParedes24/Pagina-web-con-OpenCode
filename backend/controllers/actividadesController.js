const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'actividades.json');

/**
 * Leer todas las actividades desde el archivo JSON
 */
function leerActividades() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const contenido = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer actividades:', error.message);
    return [];
  }
}

/**
 * Guardar todas las actividades en el archivo JSON
 */
function guardarActividades(actividades) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(actividades, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error al guardar actividades:', error.message);
    return false;
  }
}

module.exports = { leerActividades, guardarActividades };
