import express from 'express';

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');
    // Json

    response.json([
      'Diego',
      'Cleiton',
      'Robson',
      'Alvaro'
    ])
});

app.listen(3333);

