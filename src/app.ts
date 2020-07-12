import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';

const app = express();
mongoose.connect('mongodb://localhost:27017/v12', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(express.json());
app.use(routes);

export default app;
