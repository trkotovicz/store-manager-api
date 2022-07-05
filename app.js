const express = require('express');
require('express-async-errors');

const productsController = require('./controllers/products');
const salesController = require('./controllers/sales');
const error = require('./middlewares/error');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// products
app.get('/products/search', productsController.getByName);
app.get('/products', productsController.getAll);
app.get('/products/:id', productsController.getById);
app.post('/products', productsController.create);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.deleteProduct);

// sales
app.get('/sales', salesController.getAll);
app.get('/sales/:id', salesController.getById);

// error
app.use(error);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;
