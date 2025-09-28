// Vercel API entry point
import express from 'express';
import { registerRoutes } from '../server/routes';
import { serveStatic } from '../server/vite';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes asynchronously
let routesInitialized = false;

const initializeRoutes = async () => {
  if (!routesInitialized) {
    await registerRoutes(app);
    serveStatic(app);
    routesInitialized = true;
  }
};

// Handle all routes
app.use(async (req, res, next) => {
  await initializeRoutes();
  next();
});

// Export for Vercel
export default app;
