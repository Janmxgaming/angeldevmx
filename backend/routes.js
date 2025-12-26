import { readDB, writeDB } from './database.js';

export function setupRoutes(app) {
  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Obtener leaderboard de un juego específico
  app.get('/api/leaderboard/:gameId', (req, res) => {
    try {
      const { gameId } = req.params;
      const db = readDB();
      const leaderboard = db.leaderboards[gameId] || [];
      
      const topScores = leaderboard
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);
      
      res.json(topScores);
    } catch (error) {
      console.error('Error reading leaderboard:', error);
      res.status(500).json({ error: 'Error reading leaderboard' });
    }
  });

  // Agregar nueva entrada al leaderboard
  app.post('/api/leaderboard/:gameId', (req, res) => {
    try {
      const { gameId } = req.params;
      const { username, score } = req.body;
      
      if (!username || typeof score !== 'number') {
        return res.status(400).json({ error: 'Invalid data: username and score required' });
      }
      
      const db = readDB();
      
      if (!db.leaderboards[gameId]) {
        db.leaderboards[gameId] = [];
      }
      
      const newEntry = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        username: username.trim(),
        score,
        date: Date.now()
      };
      
      db.leaderboards[gameId].push(newEntry);
      db.leaderboards[gameId] = db.leaderboards[gameId]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);
      
      writeDB(db);
      
      res.status(201).json(newEntry);
    } catch (error) {
      console.error('Error saving score:', error);
      res.status(500).json({ error: 'Error saving score' });
    }
  });

  // Obtener todos los leaderboards
  app.get('/api/leaderboards', (req, res) => {
    try {
      const db = readDB();
      res.json(db.leaderboards);
    } catch (error) {
      console.error('Error reading leaderboards:', error);
      res.status(500).json({ error: 'Error reading leaderboards' });
    }
  });

  // Limpiar leaderboard de un juego
  app.delete('/api/leaderboard/:gameId', (req, res) => {
    try {
      const { gameId } = req.params;
      const db = readDB();
      
      if (db.leaderboards[gameId]) {
        db.leaderboards[gameId] = [];
        writeDB(db);
        res.json({ message: `Leaderboard for ${gameId} cleared` });
      } else {
        res.status(404).json({ error: 'Leaderboard not found' });
      }
    } catch (error) {
      console.error('Error clearing leaderboard:', error);
      res.status(500).json({ error: 'Error clearing leaderboard' });
    }
  });
}
