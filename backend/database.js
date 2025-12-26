import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_FILE = join(__dirname, 'leaderboard.json');

// Inicializar base de datos si no existe
if (!existsSync(DB_FILE)) {
  writeFileSync(DB_FILE, JSON.stringify({ leaderboards: {} }, null, 2));
}

export const readDB = () => {
  const data = readFileSync(DB_FILE, 'utf-8');
  return JSON.parse(data);
};

export const writeDB = (data) => {
  writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};
