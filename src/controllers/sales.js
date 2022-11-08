const { pool } = require('../../config');

const getVendas = (request, response) => {
  pool.query(`select v.codigo as codigo, v.descricao as descricao, 
      v.qtde_venda as qtde_venda, v.valor as valor, v.data_inc as data_inc,  
      v.valor_total as valor_total, p.nome as produto, p.codigo as codigo_produto 
    from vendas v
    join produtos p on v.produto = p.codigo
    order by v.codigo`, 
  (error, results) => {
      if (error){
          return response.status(400).json({
              status : 'error',
              message: 'Erro ao consultar as vendas: ' + error
          });
      }
      response.status(200).json({ data: results.rows });
  })
}

const addVenda = (request, response) => {
    const {descricao, qtde_venda, valor, valor_total, produto} = request.body;
    pool.query(`insert into vendas (descricao, qtde_venda, valor, valor_total, produto, data_inc) 
    values ($1, $2, $3, $4, $5, now())
    returning codigo, descricao, qtde_venda, valor, valor_total, produto, data_inc`, 
    [descricao, qtde_venda, valor, valor_total, produto], 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir a venda! Erro: '+error
            });
        }
        response.status(200).json({
            status : 'success', 
            message : "Venda incluída!",
            data : results.rows[0]
        });
    })
}

const updateVenda = (request, response) => {
  const codigo = parseInt(request.params.codigo);
  const {descricao, qtde_venda, valor, valor_total, produto} = request.body;
  pool.query(`UPDATE vendas
    SET descricao=$1, qtde_venda=$2, valor=$3, valor_total=$4, produto=$5 
    WHERE codigo=$6
    returning descricao, qtde_venda, valor, valor_total, produto`, 
  [descricao, qtde_venda, valor, valor_total, produto, codigo] , 
  (error, results) => {
      if (error){
        return response.status(400).json({
          status: 'error',
          message: 'Erro ao modificar venda! ' + error
        });
      }
      response.status(200).json({
          status : 'success', 
          message : "Venda atualizada!",
          data : results.rows[0]
      });
  })
}


const deleteVenda = (request, response) => {
  const codigo = parseInt(request.params.codigo);
  pool.query(`DELETE FROM vendas WHERE codigo=$1`, [codigo], 
  (error, results) => {
      if (error || results.rowCount == 0){
          return response.status(400).json({
              status : 'error',
              message: 'Erro ao remover a venda! ' + (error ? error : '')
          });
      }
      response.status(200).json({
          status : 'success', 
          message : "Venda removida!"
      });
  })
}

const getVenda = (request, response) => {
  const codigo = parseInt(request.params.codigo);
  pool.query(`SELECT * FROM vendas WHERE codigo=$1`, [codigo], 
  (error, results) => {
      if (error || results.rowCount == 0){
          return response.status(400).json({
              status : 'error',
              message: 'Erro ao buscar venda! ' + error
          });
      }
      response.status(200).json({ data: results.rows[0] });
  })
}

module.exports = {
  getVendas,
  deleteVenda,
  updateVenda,
  addVenda,
  getVenda
}
