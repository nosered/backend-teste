const vendaController = require('../controllers/venda-controller.js');
const authController = require('../controllers/auth-controller.js');

module.exports = function (app) {
  app.use('/api/vendas',authController.check);
  app.get('/api/vendas', vendaController.getAll);
  app.get('/api/vendas/:id', vendaController.find);
  app.post('/api/vendas', vendaController.create);
  app.put('/api/vendas/:id', vendaController.update);
  app.delete('/api/vendas/:id', vendaController.remove);
  app.post('/api/vendas/:id/produtos', vendaController.addProduto);
}