const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');
const clienteRoutes = require('./routes/cliente-routes.js');
const vendaRoutes = require('./routes/venda-routes.js');
const produtoRoutes = require('./routes/produto-routes.js');
const chartRoutes = require('./routes/chart-routes.js');
const authRoutes = require('./routes/auth-routes.js');
const PORT = process.env.PORT || 3000;

// FILTRO CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./public'));

// Adiciona os endpoints da API
authRoutes(app);
chartRoutes(app);
clienteRoutes(app);
vendaRoutes(app);
produtoRoutes(app);

// Endpoints não encontrados
app.get('/api*', (req, res) => {
	res.status(404).send('404 - Endpoint não encontrado');
});

// Tudo que sobre vai pro index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../public/index.html'));
});

models.sequelize.sync().then(function() {
	app.listen(PORT, function() {
		console.log('Ouvindo na porta '+ PORT + ' ...');
	});
});
