import knex from 'knex';
// padronizar caminhos com o path
import path from 'path'

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
});

export default connection;