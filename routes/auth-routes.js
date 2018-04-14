const authController = require('../controllers/auth-controller.js');

module.exports = function (app) {
	app.post('/api/autenticacao',authController.login);
}