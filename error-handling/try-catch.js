/*
Error Handling eh a forma de como se lidar com os erros de sistemas
[criado pelo sistema ou pelo proprio desenvolvedor]

Os erros criados por desevolvedor sao criado pela palavra-chave

    THROW 
Que retorna qualquer objeto passado por ele

    THROW string
    THROW number
        ...
    THROW object
    THROW arrays
    
THROW, assim como return, sai do fluxo. Porem, o THROW cai no fluxo CATCH
do try-catch

como mostrado a seguir:
*/

try{
    console.log("inicio");
    throw "error";
}catch(message){
    console.log(message);
}

/*
Objeto ERROR

Objeto Error permite em seu construtor uma mensagem
    Error(mensagem);
*/

try {
    throw Error("Construtor Error")
} catch (error) {
    console.log(error.message);
}

/*
Criando uma funcao para lidar com erros 

*/
function tratamentoErros(error){
    console.log(error.message)

    if(error.message == "Construtor Error")
        console.log('inicia correcao')
}

try {
    throw Error("Construtor Error")
} catch (error) {
    tratamentoErros(error);
}


/*
Podemos tambem extender o objeto Error para acrescentar 
propriedades personalizadas
*/

class meuObjetoDeErro extends Error {
    constructor(codigo, mensagemPersonalizada){
        super();
        this.codigo = codigo;
        this.mensagemPersonalizada = mensagemPersonalizada;
    }
}


try {
    throw new meuObjetoDeErro(1, "Mensagem de erro personalizada");
} catch (error) {
    console.log(`codigo:${error.codigo} -> ${error.mensagemPersonalizada}`);
}

/*
Outra forma eh atraves da gradularizacao, onde divide os tratamentos
erros em menores partes atraves da criacao por algum tipo especifico 
de Error : lista na MDN. 
    depois disso eh tratado por:
        intanceof 
    que verificara qual eh o construtor usado para criar o erro.
*/