const clienteController = require('../controllers/cliente-controller.js');
const authController = require('../controllers/auth-controller.js');

module.exports = function (app) {
  app.use('/api/clientes',authController.check);
  app.get('/api/clientes', clienteController.getAll);
  app.get('/api/clientes/:id', clienteController.find);
  app.post('/api/clientes', clienteController.create);
  app.put('/api/clientes/:id', clienteController.update);
  app.delete('/api/clientes/:id', clienteController.remove);
}