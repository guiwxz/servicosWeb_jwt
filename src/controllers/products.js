const { pool } = require('../../config');

const getProdutos = (request, response) => {
  pool.query('SELECT * FROM produtos order by codigo',
    (error, results) => {
      if (error) {
        return response.status(400).json(
          {
            status: 'error',
            message: 'Erro ao consultar produtos: ' + error
          }
        );
      }
      response.status(200).json({ data: results.rows});
    }
  )
}


const addProduto = (request, response) => {
  const { nome, preco, cfop, qtde } = request.body;
  pool.query(`INSERT INTO produtos (nome, preco, cfop, qtde) 
    values ($1, $2, $3, $4)  
    returning *`,
    [nome, preco, cfop, qtde],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          status: 'error',
          message: 'Erro ao inserir o produto: ' + error
        })
      }
      response.status(201).json({
        status: "success", message: "Produto criado",
        data: results.rows[0]
      })
    })
}

const updateProduto = (request, response) => {
  const codigo = parseInt(request.params.codigo);
  const { nome, preco, cfop, qtde } = request.body;

  pool.query(`UPDATE produtos SET nome=$1, preco=$2, cfop=$3, qtde=$4 
    WHERE codigo=$5 returning codigo, nome, preco, cfop, qtde`,
    [nome, preco, cfop, qtde, codigo],
    (error, results) => {
      if (error) {
        return response.status(400).json({
          status: 'error',
          message: 'Erro ao alterar o produto: ' + error
        })
      }
      response.status(200).json({
        status: "success", 
        message: "Produto alterado",
        data: results.rows[0]
      })
    })
}

const deleteProduto = (request, response) => {
  const codigo = parseInt(request.params.codigo);
  pool.query(`DELETE FROM produtos WHERE codigo = $1`,
    [codigo],
    (error, results) => {
      if (error || results.rowCount == 0) {
        return response.status(400).json({
          status: 'error',
          message: 'Erro ao remover o produto: ' +
            (error ? error : 'Não removeu nenhuma linha')
        })
      }
      response.status(200).json({
        status: "success", message: "Produto removido"
      })
    })
}

const getProduto = (request, response) => {
  const codigo = parseInt(request.params.codigo);
  pool.query(`SELECT * FROM produtos WHERE codigo = $1`,
    [codigo],
    (error, results) => {
      if (error || results.rowCount == 0) {
        return response.status(400).json({
          status: 'error',
          message: 'Erro ao buscar produto: ' +
            (error ? error : 'Não encontrou nenhuma linha')
        })
      }
      response.status(200).json({ data: results.rows[0] })
    })
}

module.exports = {
  getProduto,
  getProdutos,
  deleteProduto,
  addProduto,
  updateProduto
}

