const express = require('express');
const cors = require('cors');
const app = express();
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/notes', notesRouter);

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`backend listening on PORT-${PORT}`)
});