const { pool } = require('../../config');

require('dotenv-safe').config();

const jwt = require('jsonwebtoken');

const login = (request, response, next) => {
  const { email, senha } = request.body;

  pool.query(
    `SELECT * FROM usuarios WHERE email = $1 and senha = $2`,
    [email, senha],
    (error, results) => {
      console.log(results);
      if (error || results.rowCount == 0) {
        return response.status(401).json({
          auth: false,
          message: "Usuário ou senha inválidos" + error
        })
      }

      const email_usuario = results.rows[0].email;
      const nome_usuario = results.rows[0].nome;

      const token = jwt.sign(
        {
          email_usuario,
          nome_usuario
        },
        process.env.SECRET,
        {
          expiresIn: 300 // expira em 5 min
        }
      )

      return response.json({
        auth: true,
        token
      })
    }
  )
}

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(401).json({ 
      auth: false, 
      message: 'Nenhum token recebido' 
    });
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ 
        auth: false, 
        message: 'Erro ao autenticar o token' 
      });
    }

    req.email = decoded.email_usuario;
    next();
  })
}

module.exports = {
  login,
  verifyJWT
}