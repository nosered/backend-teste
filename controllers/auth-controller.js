const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuario = {
  email: 'usuario@usuario',
  senha: bcrypt.hashSync('usuario', 10)
}

module.exports.login = function(req, res) {
  if(!req.body.email || !req.body.senha || req.body.email !== usuario.email){
      falha('Usuário não encontrado.');
  }

  if(!bcrypt.compareSync(req.body.senha, usuario.senha)) {
    falha('Senha incorreta.');
  } else {
    const token = jwt.sign(usuario, 's3cr3tk3y');
    res.status(200).json({
      message: 'Autenticação realizada com sucesso!',
      token: token
    });
  }

  function falha(msg) {
    res.status(401).send(msg);
  }
}

module.exports.check = function(req, res, next) {
  jwt.verify(req.query.token, 's3cr3tk3y', function(erro, decode) {
    if(erro) {
      return res.status(401).json({
        title: 'Não autenticado!',
        erro: erro
      });
    }
    next();
  });
}