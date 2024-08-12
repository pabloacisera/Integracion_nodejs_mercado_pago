import express from 'express';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import url from 'url';
import cors from 'cors';
import routerPayments from './routes.js';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

// Middlewares
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Rutas del servidor
app.use('/pay', routerPayments);


app.listen(port, () => {
    console.log('Servidor corriendo en puerto: ', port);
});
