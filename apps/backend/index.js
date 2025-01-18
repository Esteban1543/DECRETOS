import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json())

import AutenticacionRouter from './routes/AutenticacionRouter.js'

app.use('/', AutenticacionRouter)

import PersonasRouter from './routes/PersonasRouter.js'

app.use('/', PersonasRouter)

import ProcesosRouter from './routes/ProcesosRouter.js'

app.use('/', ProcesosRouter)

import InformesRouter from './routes/InformesRouter.js'

app.use('/', InformesRouter)

import ActasRouter from './routes/ActasRouter.js'

app.use('/', ActasRouter)

app.use(express.static(new URL('./assets', import.meta.url).pathname));

app.listen(port, () => {
    console.log(`🟢 El servidor inicio correctamente | \x1b[36mhttp://localhost:${port}\x1b[0m`);
});
