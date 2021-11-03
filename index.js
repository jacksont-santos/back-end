const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const jogoRotas = require('./rotas/jogo.rotas')

app.use('/jogo',jogoRotas)

const port = 3000;
app.listen(port,() => {console.log(' Servidor rodando na porta 3000')});