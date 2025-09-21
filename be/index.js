import express from 'express'
import { Mongo_Uri, port } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors'
import notesRouter from './routes/notesRoutes.js';

const app = express();
app.use(express.json());
app.use(cors())


app.use('/api/notes',notesRouter)

mongoose.connect(Mongo_Uri)
.then(() => {
    console.log('Db connected')        
    app.listen(port,() => {
        console.log('server listening to port 8080')
    })
})
.catch((err) => console.log(err))