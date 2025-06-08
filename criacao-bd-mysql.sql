USE defaultdb;

CREATE TABLE IF NOT EXISTS user(
	id int primary key,
    username varchar(150)
);

INSERT INTO user (id, username) VALUES 
(1,'LUCIO PASSOS PATROCINIO'),
(2, 'MARIA DE LA COSTA'),
(3, 'João Caminhão');

SELECT * FROM user;