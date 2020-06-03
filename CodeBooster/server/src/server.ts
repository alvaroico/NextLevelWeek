import express from 'express';
import path from 'path'
import routes from './routes'

const app = express();

app.use(express.json());
app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.listen(3333);





















//---------- Comentário do projeto --------
/*
import express from 'express';

const app = express();
// Reconhecer formato JSON
app.use(express.json());


// Rota: Endereço completo da requisição
// Recurso: Quando entidade estamos acessando do sistema

// GET:  Buscar uma ou mais informações do back-end
// POST: Criar uma nova informação no back-end
// PUT: Atualizar uma informação existente no back-end
// DELETE: Remover uma informação do Back-end

// POST http://localhost:3333/users = Criar um usuário
// GET http://localhost:3333/users = Listar usuários
// GET http://localhost:3333/users/5 = Buscar dados do usuário com ID 5

//banco
//SELECT * FROM users WERE name = 'Alvaro'
// knex('users').where('name', 'Alvaro').select('*')

const users = [
  'Diego',
  'Cleiton',
  'Robson',
  'Alvaro'
];

app.get('/users', (request, response) => {
  // Query Param: pode retornar um array por isso travado String e opcional 
  const search = String(request.query.search);

  const filteredUsers = search ? users.filter(user => user.includes(search)) : users;
  
  //console.log('Listagem de usuários');
    
    // JSON

    response.json(filteredUsers)
});

// Request Param: Parâmetros que vem na própria rota que identificam um recurso

app.get('/users/:id', (request, response) => {
  const id = Number(request.params.id);

  const user = users[id];

  return response.json(user);

});


app.post('/users', (request, response) => {
  
  // Request Body: Parâmetros para criação/atualização de informações 
  const data = request.body;

  console.log(data)

  const user = {
    name: data.name,
    email: data.email,
  };

  return response.json(user);
  
});

app.listen(3333);

*/