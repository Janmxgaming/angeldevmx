import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupRoutes } from './routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Leaderboard API ready at http://localhost:${PORT}/api/leaderboard`);
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`);
});
