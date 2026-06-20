const express = require('express');
const app = express();
const notesRouter = require('./routes/notes');
const authRouter = require('./routes/auth');

app.use(express.json());

app.use('/auth', authRouter);
app.use('/notes', notesRouter);

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`backend listening on PORT-${PORT}`)
});