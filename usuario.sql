    CREATE TABLE usuarios (
        nome VARCHAR(50),
        email VARCHAR(100),
        idade INT
    );


INSERT INTO usuarios (nome, email, idade) 
    VALUES(
        'Novo User', 
        'user@email', 
        30
    );

DELETE FROM usuarios 
    WHERE nome='Gustavo';



UPDATE usuarios SET nome='Gustavo de Souza Valim', email='NovoEmail@email.com.br'
    WHERE nome='Gustavo';
