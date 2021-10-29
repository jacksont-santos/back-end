const express = require('express');
const app = express();
app.use(express.json());

var jogos = [
    {
    titulo: '1',
    genero: '1',
    imagem: '',
    avaliacao: '1'
},
{
    titulo: '2',
    genero: 'ação',
    imagem: '2',
    avaliacao: '2'
},
{
    titulo: '3',
    genero: 'ação',
    imagem: '3',
    avaliacao: '3'
}];

app.get('/', (req,res) => {
    res.send(jogos)
});

app.get('/jogo/:id', (req,res) => {
    const id = req.params.id -1;
    let jogo = jogos[id];
    res.send(jogo)
});

const port = 3000;
app.listen(port,() => {console.log(' Servidor rodando na porta 3000')});