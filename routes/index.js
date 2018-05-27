const express = require('express');
const router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgres://matheus:123@localhost:5432/mydb';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// recupera os dados por post e armazena na tabela
router.post('/api/v1/mydbs', (req, res, next) =>{
	const results = [];
	// pega as informações de http request
	const data = {numPolos: req.body.numPolos, tenRede: req.body.tenRede, regServ: req.body.regServ, corrNom: req.body.corrNom, potNom: req.body.potNom, torqMax: req.body.torqMax};
	// puxa o cliente da conexão
	pg.connect(connectionString, (err, client, done) => {
		//manipula error de conexão
		if(err){
			done();
			console.log(err);
			return res.status(500).json({sucess: false, data: err});
		}
		// SQL query para inserir dados na tabela
		client.query('INSERT INTO motores(numPolos, tenRede, regServ, corrNom, potNom, torqMax) values ($1, $2, $3, $4, $5, $6)', [data.numPolos, data.tenRede, data.regServ, data.corrNom, data.potNom, data.torqMax]);
		// sql query para selecionar dados da tabela
		const query = client.query('SELECT * FROM motores ORDER BY id ASC;');
		// apresenta resultados uma lina por vez
		query.on('row', (row) => {
			results.push(row);
		});
		//após apresentar todos os dados, fecha a conexão e retorna o resultado
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});

// estrutura para efetuar a busca e leitura na tabela
router.get('/api/v1/mydbs', (req, res, next) => {
	const results = [];
	// puxa o cliente da conexão
	pg.connect(connectionString, (err, client, done)=> {
		// manipula erro de conexão
		if(err){
			done();
			console.log(err);
			return res.status(500).json({sucess: false, data:  err});
		}
		// sql query para selecionar dados da tabela
		const query = client.query('SELECT * FROM motores ORDER BY id ASC;');
		// apresenta os resultados por linha
		query.on('row', (row) => {
			results.push(row);
		});
		//após apresentar todos os dados, fecha a conexão e retorna o resultado
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});

//estrutura para update dos items na tabela
router.put('/api/v1/mydbs/:mydb_id', (req, res, next) => {
	const results = [];
	//recupera o id via URL
	const id = req.params.mydb_id;
	//recupera os  dados via http request
	const data = {numPolos: req.body.numPolos, tenRede: req.body.tenRede, regServ: req.body.regServ, corrNom: req.body.corrNom, potNom: req.body.potNom, torqMax: req.body.torqMax};
	//puxa o cliente da conexão
	pg.connect(connectionString, (err, client, done) =>{
		// manipula erro de conexão
		if(err){
			done();
			console.log(err);
			return res.status(500).json({sucess: false, data: err});
		}
		// sql query para dar update no item da tabela
		client.query('UPDATE motores SET numPolos=($1), tenRede=($2), regServ=($3), corrNom=($4), potNom=($5), torqMax=($6) WHERE id=($7)', [data.numPolos, data.tenRede, data.regServ, data.corrNom, data.potNom, data.torqMax, id]);
		// sql query para selecionar dados da tabela
		const query = client.query('SELECT * FROM motores ORDER BY id ASC;');
		// apresenta os resultado por linha
		query.on('row', (row) => {
			results.push(row);
		});
		//  após retornar todos os dados, fecha a conexão
		query.on('end', function(){
			done();
			return res.json(results);
		});
	});
});

//estrutura para deletar dados da tabela
router.delete('/api/v1/mydbs/:mydb_id', (req, res, next) => {
	const results = [];
	// pega os dados dos parametros da url
	const id = req.params.mydb_id;
	//puxa o cliente da conexão
	pg.connect(connectionString, (err, client, done) => {
		//manipula error de conexão
		if(err){
			done();
			console.log(err);
			return res.status(500).json({sucess: false, data: err});
		}
		client.query('DELETE FROM motores WHERE id=($1)', [id]);
		var query = client.query('SELECT * FROM motores ORDER BY id ASC;');
		query.on('row', (row) => {
			results.push(row);
		});
		query.on('end', () => {
			done();
			return res.json(results);
		});
	});
});

module.exports = router;

		// curl --data "numPolos=2&tenRede=220&regServ=S1&corrNom=1&potNom=2&torqMax=3" http://127.0.0.1:3000/api/v1/mydbs
		//  curl -X PUT --data "numPolos=4&tenRede=110&regServ=S3&corrNom=4&potNom=4&torqMax=4" http://127.0.0.1:3000/api/v1/mydbs/1