create table produtos (
	codigo serial primary key, 
	nome varchar(40) not null, 
	preco float not null, 
	cfop varchar(4) not null,
  qtde float not null default 0
);

insert into produtos (nome, preco, cfop, qtde) 
values ('Gasolina Comum', 5.0, '5656', 5000), ('Diesel BS500', 6.33, '5656', 5000)
returning nome, preco, cfop, qtde;


create table vendas (
	codigo serial primary key, 
	descricao varchar(40) not null, 
	qtde_venda float not null, 
  valor float not null,
  valor_total float not null,
  data_inc TIMESTAMP,
	produto integer not null, 

	foreign key (produto) references produtos (codigo)
);

insert into vendas (descricao, qtde_venda, valor, valor_total, produto) 
values ('Venda de combustivel', 300, 1500.00, 1500.00, 1), ('Venda de combustivel', 100, 633.00, 633.00, 2)
returning descricao, qtde_venda, valor, valor_total, produto;

create table usuarios (
	email varchar(50) not null primary key, 
	senha varchar(20) not null, 
	tipo char(1)  not null, 
	check (tipo = 'T' or tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);


insert into usuarios (email, senha, tipo, telefone, nome) values ('gui@hotmail.com', '123', 'A', '(54)996650672', 'Guilherme Manfroi')
