import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './routes/user.route';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/', UserRoutes);

const getAController = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome from the server!',
  })
};

app.get('/', getAController);

export default app;
