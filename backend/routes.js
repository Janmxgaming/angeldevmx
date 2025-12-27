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
      
      // Deduplicate: Keep only highest score per user (case-insensitive)
      const userMap = new Map();
      leaderboard.forEach(entry => {
        const normalizedUsername = entry.username.toLowerCase();
        const existing = userMap.get(normalizedUsername);
        if (!existing || entry.score > existing.score) {
          userMap.set(normalizedUsername, entry);
        }
      });
      
      const deduplicated = Array.from(userMap.values())
        .sort((a, b) => b.score - a.score)
        .slice(0, 50);
      
      res.json(deduplicated);
    } catch (error) {
      console.error('Error reading leaderboard:', error);
      res.status(500).json({ error: 'Error reading leaderboard' });
    }
  });

  // Obtener repositorios públicos de GitHub
  app.get('/api/github/repos', async (req, res) => {
    const username = 'Janmxgaming';
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=12`;
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('GitHub API error');
      const repos = await response.json();

      // Filtra y mapea solo la info relevante
      const cleanRepos = repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        updated_at: repo.updated_at,
        topics: repo.topics,
        owner: {
          avatar_url: repo.owner.avatar_url,
          login: repo.owner.login
        }
      }));

      res.json({ repos: cleanRepos });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Agregar/actualizar entrada al leaderboard
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
      
      const normalizedUsername = username.trim().toLowerCase();
      
      // Buscar si el usuario ya existe (case-insensitive)
      const existingIndex = db.leaderboards[gameId].findIndex(
        entry => entry.username.toLowerCase() === normalizedUsername
      );
      
      let entry;
      
      if (existingIndex !== -1) {
        // Si existe, actualizar solo si el nuevo score es mayor
        const existingEntry = db.leaderboards[gameId][existingIndex];
        if (score > existingEntry.score) {
          entry = {
            ...existingEntry,
            score,
            date: Date.now()
          };
          db.leaderboards[gameId][existingIndex] = entry;
          console.log(`Updated ${username}: ${existingEntry.score} -> ${score}`);
        } else {
          console.log(`Score ${score} not higher than ${existingEntry.score} for ${username}`);
          return res.status(200).json({ 
            message: 'Score not higher than existing', 
            existing: existingEntry 
          });
        }
      } else {
        // Si no existe, crear nueva entrada
        entry = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          username: username.trim(),
          score,
          date: Date.now()
        };
        db.leaderboards[gameId].push(entry);
        console.log(`New entry for ${username}: ${score}`);
      }
      
      // Ordenar y mantener top 100
      db.leaderboards[gameId] = db.leaderboards[gameId]
        .sort((a, b) => b.score - a.score)
        .slice(0, 100);
      
      writeDB(db);
      
      res.status(201).json(entry);
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

  // Limpiar duplicados en un leaderboard
  app.post('/api/leaderboard/:gameId/deduplicate', (req, res) => {
    try {
      const { gameId } = req.params;
      const db = readDB();
      
      if (!db.leaderboards[gameId]) {
        return res.status(404).json({ error: 'Leaderboard not found' });
      }
      
      const original = db.leaderboards[gameId];
      const userMap = new Map();
      
      // Mantener solo el score más alto por usuario (case-insensitive)
      original.forEach(entry => {
        const normalizedUsername = entry.username.toLowerCase();
        const existing = userMap.get(normalizedUsername);
        
        if (!existing || entry.score > existing.score) {
          userMap.set(normalizedUsername, entry);
        }
      });
      
      db.leaderboards[gameId] = Array.from(userMap.values())
        .sort((a, b) => b.score - a.score);
      
      const removed = original.length - db.leaderboards[gameId].length;
      
      writeDB(db);
      
      res.json({ 
        message: `Removed ${removed} duplicate entries`,
        before: original.length,
        after: db.leaderboards[gameId].length
      });
    } catch (error) {
      console.error('Error deduplicating leaderboard:', error);
      res.status(500).json({ error: 'Error deduplicating leaderboard' });
    }
  });
}
