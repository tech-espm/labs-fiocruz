CREATE DATABASE IF NOT EXISTS fiocruz DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE fiocruz;

-- DROP TABLE IF EXISTS perfil;
CREATE TABLE perfil (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome_UN (nome)
);

-- Manter sincronizado com enums/perfil.ts e models/perfil.ts
INSERT INTO perfil (nome) VALUES ('Administrador'), ('Comum');

-- DROP TABLE IF EXISTS usuario;
CREATE TABLE usuario (
  id int NOT NULL AUTO_INCREMENT,
  email varchar(100) NOT NULL,
  nome varchar(100) NOT NULL,
  idperfil int NOT NULL,
  senha varchar(100) NOT NULL,
  token char(32) DEFAULT NULL,
  confirmado tinyint NOT NULL,
  exclusao datetime NULL,
  criacao datetime NOT NULL,
  tokenreset tinytext NULL,
  datalimitereset tinytext NULL, -- Armazena como tinytext, e não como datetime, para não ocupar RAM do servidor
  PRIMARY KEY (id),
  UNIQUE KEY usuario_email_UN (email),
  KEY usuario_exclusao_IX (exclusao),
  KEY usuario_idperfil_FK_IX (idperfil),
  CONSTRAINT usuario_idperfil_FK FOREIGN KEY (idperfil) REFERENCES perfil (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

INSERT INTO usuario (email, nome, idperfil, senha, confirmado, criacao) VALUES ('admin@fiocruz.br', 'Administrador', 1, 'NsSzgX9AXd2G85aiCOrUwAFkiEHrHYljYWpJBCfqOvKr:WD+jsEW/Dswcivs42EZBZREfm+4WaPcZHRPG5LJpD8yr', 1, NOW());

-- DROP TABLE IF EXISTS projeto;
CREATE TABLE projeto (
  id int NOT NULL,
  idusuario int NOT NULL,
  nome varchar(100) NOT NULL,
  apelido varchar(100) NOT NULL,
  aprovado tinyint NOT NULL,
  criacao datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY projeto_nome_UN (nome),
  KEY projeto_idusuario_FK_IX (idusuario),
  CONSTRAINT projeto_idusuario_FK FOREIGN KEY (idusuario) REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE RESTRICT
);
