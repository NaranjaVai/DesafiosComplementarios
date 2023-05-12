import express from 'express';
import productRouter from './routes/productRouter';
import errorHandler from './middlewares/errorHandler';

const app = express();
port = 8080
const server = app.listen (port, () => console.log(`Server Running on port : ${server.address().port}`))

app.use(express.json())
app.use ('/', productRouter);
app.use(errorHandler)
