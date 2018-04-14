const produtoController = require('../controllers/produto-controller.js');
const authController = require('../controllers/auth-controller.js');

module.exports = function (app) {
  app.use('/api/produtos',authController.check);
  app.get('/api/produtos', produtoController.getAll);
  app.get('/api/produtos/:id', produtoController.find);
  app.post('/api/produtos', produtoController.create);
  app.put('/api/produtos/:id', produtoController.update);
  app.delete('/api/produtos/:id', produtoController.remove);
}