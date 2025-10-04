// server.js
const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'data');

// ------------------
// Funciones utilitarias
// ------------------
async function readJson(fileName) {
  const filePath = path.join(DATA_DIR, fileName);
  try {
    const txt = await fs.readFile(filePath, 'utf8');
    return JSON.parse(txt || '[]');
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

async function writeJson(fileName, data) {
  const filePath = path.join(DATA_DIR, fileName);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function nextId(items) {
  if (!Array.isArray(items) || items.length === 0) return 1;
  return Math.max(...items.map(i => Number(i.id) || 0)) + 1;
}

// ------------------
// CRUD genérico
// ------------------
function createCrudRoutes(entity, fileName) {
  const base = `/api/${entity}`;

  app.get(base, async (req, res) => res.json(await readJson(fileName)));

  app.get(`${base}/:id`, async (req, res) => {
    const items = await readJson(fileName);
    const item = items.find(i => String(i.id) === req.params.id);
    item ? res.json(item) : res.status(404).json({ error: 'No encontrado' });
  });

  app.post(base, async (req, res) => {
    const items = await readJson(fileName);
    const newItem = { id: nextId(items), ...req.body };
    items.push(newItem);
    await writeJson(fileName, items);
    res.status(201).json(newItem);
  });

  app.put(`${base}/:id`, async (req, res) => {
    const items = await readJson(fileName);
    const idx = items.findIndex(i => String(i.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
    items[idx] = { ...items[idx], ...req.body };
    await writeJson(fileName, items);
    res.json(items[idx]);
  });

  app.delete(`${base}/:id`, async (req, res) => {
    const items = await readJson(fileName);
    const idx = items.findIndex(i => String(i.id) === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'No encontrado' });
    const deleted = items.splice(idx, 1)[0];
    await writeJson(fileName, items);
    res.json({ deleted });
  });
}

// ------------------
// Rutas para la cafetería
// ------------------
createCrudRoutes('productos', 'productos.json');
createCrudRoutes('usuarios', 'usuarios.json');
createCrudRoutes('pedidos', 'pedidos.json');

// ------------------
// Servir React (build) para producción
// ------------------
const frontendPath = path.join(__dirname, 'my-app', 'build');
app.use(express.static(frontendPath));


app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return res.status(404).json({ error: 'No encontrado' });
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ------------------
// Ruta de salud
// ------------------
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ------------------
// Servidor
// ------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
