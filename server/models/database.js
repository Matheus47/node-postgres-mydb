const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://root:123@localhost:5432/mydb';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query('CREATE TABLE motores(id SERIAL PRIMARY KEY, numPolos int, tenRede int, regServ varchar(2), corrNom real, potNom real, torqMax real)');
query.on('end', () => {client.end();});