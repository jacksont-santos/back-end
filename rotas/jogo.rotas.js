const express = require('express');
const router = express.Router();

var jogos = [
    {
    id: 1,
    titulo: 'Dark Souls 3',
    genero: 'Ação/Aventura',
    imagem: './img/darkSouls.jpg',
    avaliacao: '9',
    interacao: 'NÃO JOGADO'
},
{
    id: 2,
    titulo: 'Resident Evil Village',
    genero: 'Ação/Sobrevivência',
    imagem: './img/residentevil.jpg',
    avaliacao: '9',
    interacao: 'NÃO JOGADO'
},
{
    id: 3,
    titulo: 'Pro Evolution Soccer 2011',
    genero: 'Esporte',
    imagem: './img/pes2011.jpg',
    avaliacao: '8',
    interacao: 'NÃO JOGADO'
}];
var message;
var countId = 3;

router.get('/', (req,res) => {
    res.send(jogos)
});

router.get('/:id', (req,res) => {
    const id = req.params.id;
    let item = jogos.findIndex(jogo => jogo.id == id);
    if(item < 0) {
        res.status(404).send({
            error: 'Jogo não encontrado!'
        })
        return;
    };
    let jogo = jogos[item];
    res.send(jogo)
});

router.post('/add', (req,res)=>{
    const newgame = req.body;
    if (!newgame.titulo || !newgame.genero || !newgame.imagem || !newgame.avaliacao){
        res.status(400).send({message: 'Preencha todos os campos'});
        return;
    };
    countId++;
    newgame.id = countId;
    jogos.push(newgame);
    res.send({
        message: ` Novo jogo ${newgame.titulo} cadastrado!`,
        dados: jogos})
});


router.put('/:id',(req,res)=> {
    const idjogo = req.params.id;
    const edicao = req.body;
    if (!edicao.titulo || !edicao.genero || !edicao.imagem || !edicao.avaliacao){
        res.status(400).send({message: 'Preencha todos os campos'});
        return;
    };
    let item = jogos.findIndex(jogo => jogo.id == idjogo);
    if(item < 0) {
        res.status(404).send({
            error: 'O jogo que você está tentando editar não foi encontrado'
        })
        return;
    };
    jogos[item] = {
        ...jogos[item], ...edicao};
    message = ` Jogo ${edicao.titulo} editado com sucesso!`;
    res.send({jogos,message})
});

router.delete('/delete/:id', (req,res)=> {
    const idjogo = req.params.id;
    let item = jogos.findIndex(jogo => jogo.id == idjogo);
    if(item < 0) {
        res.status(404).send({
            error: 'Jogo não encontrado!'
        })
        return;
    };
    jogos.splice(item,1);
    message = ` Jogo excluído!`;
    res.send({jogos,message})
});

module.exports = router;