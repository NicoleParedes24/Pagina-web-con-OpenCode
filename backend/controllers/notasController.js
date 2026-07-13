const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'notas.json');

function leerNotas() {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, '[]', 'utf8');
      return [];
    }
    const contenido = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('Error al leer notas:', error.message);
    return [];
  }
}

function guardarNotas(notas) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(notas, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error al guardar notas:', error.message);
    return false;
  }
}

module.exports = { leerNotas, guardarNotas };
