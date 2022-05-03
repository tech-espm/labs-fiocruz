CREATE DATABASE IF NOT EXISTS fiocruz DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE fiocruz;

CREATE TABLE estado (
  id tinyint NOT NULL AUTO_INCREMENT,
  nome varchar(20) NOT NULL,
  sigla char(2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cidade (
  id smallint NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  idestado tinyint NOT NULL,
  PRIMARY KEY (id),
  KEY cidade_idestado_IX (idestado)
);

-- Executar o script cidades.sql aqui

CREATE TABLE perfil (
  id int NOT NULL AUTO_INCREMENT,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY nome_UN (nome)
);

-- Manter sincronizado com enums/perfil.ts e models/perfil.ts
INSERT INTO perfil (nome) VALUES ('Administrador'), ('Comum');

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

CREATE TABLE ods (
  id tinyint NOT NULL,
  nome varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

-- Manter sincronizado com enums/ods.ts e models/ods.ts
INSERT INTO ods (id, nome) VALUES
(1, 'Erradicação da pobreza'),
(2, 'Fome zero e agricultura sustentável'),
(3, 'Saúde e bem-estar'),
(4, 'Educação de qualidade'),
(5, 'Igualdade de gênero'),
(6, 'Água limpa e saneamento'),
(7, 'Energia limpa e acessível'),
(8, 'Trabalho decente e crescimento econômico'),
(9, 'Indústria, Inovação e infraestrutura'),
(10, 'Redução das desigualdades'),
(11, 'Cidades e comunidades sustentáveis'),
(12, 'Consumo e produção responsáveis'),
(13, 'Ação contra a mudança global do clima'),
(14, 'Vida na água'),
(15, 'Vida terrestre'),
(16, 'Paz, justiça e instituições eficazes'),
(17, 'Parcerias e meios de implementação');

CREATE TABLE projeto (
  id int NOT NULL AUTO_INCREMENT,
  idusuario int NOT NULL,
  aprovado tinyint NOT NULL,
  banco int NOT NULL,
  resumoods varchar(50) NOT NULL,
  autor varchar(100) NOT NULL,
  telefone varchar(15) NOT NULL,
  email varchar(100) NOT NULL,
  idestado tinyint NOT NULL,
  idcidade smallint NOT NULL,
  logradouro varchar(100) NOT NULL,
  numero varchar(20) NOT NULL,
  complemento varchar(50) NOT NULL,
  bairro varchar(100) NOT NULL,
  cep varchar(9) NOT NULL,
  latitude DOUBLE NOT NULL,
  longitude DOUBLE NOT NULL,
  nome varchar(100) NOT NULL,
  exposicao tinyint NOT NULL,
  versaoimagem int NOT NULL,
  info text NOT NULL,
  link varchar(200) NULL,
  exclusao datetime NULL,
  criacao datetime NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY projeto_nome_UN (nome),
  KEY projeto_idusuario_FK_IX (idusuario, exclusao),
  KEY projeto_idestado_FK_IX (idestado, idcidade),
  KEY projeto_idcidade_FK_IX (idcidade),
  KEY projeto_aprovado_exclusao_id_IX (aprovado, exclusao, id),
  KEY projeto_exposicao_aprovado_exclusao_IX (exposicao, aprovado, exclusao),
  KEY projeto_exclusao_IX (exclusao),
  CONSTRAINT projeto_idusuario_FK FOREIGN KEY (idusuario) REFERENCES usuario (id) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT projeto_idestado_FK FOREIGN KEY (idestado) REFERENCES estado (id) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT projeto_idcidade_FK FOREIGN KEY (idcidade) REFERENCES cidade (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);

CREATE TABLE projetoods (
  id int NOT NULL AUTO_INCREMENT,
  idprojeto int NOT NULL,
  idods tinyint NOT NULL,
  PRIMARY KEY (id),
  KEY projetoods_idprojeto_FK_IX (idprojeto, idods),
  KEY projetoods_idods_FK_IX (idods),
  CONSTRAINT projetoods_idprojeto_FK FOREIGN KEY (idprojeto) REFERENCES projeto (id) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT projetoods_idods_FK FOREIGN KEY (idods) REFERENCES ods (id) ON DELETE RESTRICT ON UPDATE RESTRICT
);
