import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import votingRoutes from './src/routes/voting.routes.js';
import { handleError } from './src/utils/errorHandler.js';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1', votingRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.send('Voting Backend is running...');
});

// Error Handler
app.use(handleError);

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Express server running on port ${PORT}`);
});
