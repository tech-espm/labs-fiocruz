use fiocruz;

CREATE TABLE IF NOT EXISTS `fiocruz`.`doacoes` (
            id INT NOT NULL AUTO_INCREMENT,
            idusuario int not null,
            idprojeto int not null,
            data timestamp default current_timestamp,
            valor double(10,2),
            anonimo boolean,
            Primary Key (id),
            foreign key (idusuario) references usuario(id),
            foreign key (idprojeto) references projeto(id)
            ) ENGINE = InnoDB;
            
select * from doacoes;
select * from usuario;
select * from projeto;

insert into doacoes (idusuario, idprojeto, valor, anonimo) values (34, 269, 10000.50, 0);
insert into doacoes (idusuario, idprojeto, valor, anonimo) values (34, 269, 20505.50, 1);

-- Select com Case para deixar os nomes anônimos caso o usuário tenha marcado a opção de doação anônima
SELECT 
     CASE 
         WHEN anonimo = 0 THEN u.nome
		 WHEN anonimo = 1 THEN 'Anônimo'
	end as nome,
    p.nome AS nome_projeto,
    d.valor,
    d.data
FROM doacoes d
INNER JOIN usuario u ON d.idusuario = u.id
INNER JOIN projeto p ON d.idprojeto = p.id
