process.env.NODE_ENV = 'test';

var chai = require('chai'), chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('/POST MOTOR', function(){
  	it('deve adicionar um novo motor', function(done){
  		var motor ={
  			numPolos:6,
  			tenRede:2220,
  			regServ:'S11',
  			corrNom:111,
  			potNom:222,
  			torqMax:333
  		}
  		chai.request(app)
  		.post('api/v1/mydbs')
  		.send(motor)
  		.end(function(err, res){
  			res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Motor adicionado com Sucesso!');
            res.body.livro.should.have.property('numPolos');
            res.body.livro.should.have.property('tenRede');
            res.body.livro.should.have.property('regServ');
            res.body.livro.should.have.property('corrNom');
            res.body.livro.should.have.property('potNom');
            res.body.livro.should.have.property('torqMax');
  			done();
  		});
  	});
});

describe('MOTOR', function(){
  	it('deve deletar um motor', function(done){
  		var motor ={
  			numPolos:6,
  			tenRede:2220,
  			regServ:'S11',
  			corrNom:111,
  			potNom:222,
  			torqMax:333
  		}
  		chai.request(app)
  		.delete('api/v1/mydbs/' + moto.id)
  		.end(function(err, res){
  			res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Motor excluído com Sucesso!');
  			done();
  		});
  	});
});