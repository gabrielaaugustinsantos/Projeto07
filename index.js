const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views'));
app.listen(3000, function(){
  console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var mysql = require('mysql'); 
var conexao = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "revisao"
});
conexao.connect(function(err) {
  if (err) throw err;
  console.log("Banco de Dados Conectado");
});

const veiculos = require('./model/veiculos')

app.get('/', function(req, res){
	res.sendFile(__dirname + '/views/index.html');
});

app.get('/listaveiculos', function(req, res){
    var v = new veiculos();

    v.listar(conexao, function(result){
      res.render('veiculos/lista.ejs', {veiculos: result});
    });
});

app.get('/formveiculos', function(req, res){
	res.sendFile(__dirname + '/views/veiculos/formulario.html');
});

app.post('/processarveiculos', function(req, res){
  var v = new veiculos();

  v.placa = req.body.placa;
  v.modelo = req.body.modelo;
  v.marca = req.body.marca;
  v.ano = req.body.ano;

  v.inserir(conexao);

    res.sendFile(__dirname + '/views/veiculos/resultado.html');
});