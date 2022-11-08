Api desenvolvida a partir de um sistema de vendas de produtos e combustíveis

Rotas:
  <br/>
  -- `/sales`: crud de `vendas` com chave estrangeira de um `produto`
  <br/>
  -- `/products`: crud de `produtos`

Autenticação:
  <br/>
  -- para ter acesso as rotas é necessário fazer o login e conseguir um token
    <br/>
    - post em `/login` com body inluindo email e senha válidos
    <br/>
    - utilizar (nas outras rotas) o token recebido no `headers` com a key `x-access-token` e como valor o token recebido

Integração com banco PostgreSQL
  <br/>
  -- necessário criar o banco local e declarar o nome no .env (como consta exemplo) e executar com o script 'banco.sql'
  <br/>
  -- adicionar demais credenciais no .env


Para executar:
  <br/>
  -- npm install
  <br/>
  -- npm run dev