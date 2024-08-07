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

// Obtener el directorio actual usando import.meta.url
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Ruta para servir index.html en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

// Rutas del servidor
app.use('/pay', routerPayments);


app.listen(port, () => {
    console.log('Servidor corriendo en puerto: ', port);
});
