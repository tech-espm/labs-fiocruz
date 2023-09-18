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
            
            
drop table doacoes;

select * from usuario;
select * from projeto;

insert into doacoes (idusuario, idprojeto, valor, anonimo) values (34, 269, 10000.50, 0);
insert into doacoes (idusuario, idprojeto, valor, anonimo) values (34, 269, 20505.50, 1);

select u.nome, p.nome, valor, d.data, valor, boolean
from doacoes d
inner join usuario u on d.idusuario = u.id
inner join projeto p on d.idprojeto = p.id
