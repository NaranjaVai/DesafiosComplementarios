import express from 'express';
import router from './index';
const app = express();

app.use ('/', router);

const server = app.listen (8080, () => console.log(`Server Running on port : ${server.address().port}`))