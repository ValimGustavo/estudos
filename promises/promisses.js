// func1 = function(callback){
//     setTimeout(function(){
//         console.log("func1");
//         callback();
//     }, 4000);
   
// }

// func2 = function(){
//     setTimeout(function(){
//         console.log("func2");
//     }, 3000);
// }


// func3 = function(){
//     setTimeout(function(){
//         console.log("func3");
//     }, 2000);
// }


// func4 = function(){
//     setTimeout(function(){
//         console.log("func4");
//     }, 1000);
// }
// // func1();
// // func2();
// // func3();
// // func4();
// console.log("callbacks");

// function teste(f, callback){
//     f(callback);
// }

// teste(func1,func4);

function buscar(){
    
    //criacao de uma promise, seu construtor exige um parametro: uma funcao com que tenha
    //como parametro RESOLVE e REJECT. esses parametros na verdade sao funcoes que irao retornar
    //os valores para proximo THEN ou CATCH, respectivamente.

    //Promises por so ja sao executadas no momento da sua criacao, 
    //assim tive que coloca-la dentro de uma funcao para controlar sua chamada
    
    //A Promise buscarArquivo pega um uri e faz um fetch para buscar o arquivo.
    //situacoes que a Promise lida.
    // caso uri esteja vazia: retorna Error 'uri vazia'
    // caso nao seja encontrado: retorna Error 'Arquivo nao encontrado'

    const buscarArquivo = 
    new Promise(function(resolve, reject){
        let uri = document.getElementById("uri").value;
        if(uri !== ''){
            fetch(uri).then(function(resp){
                if(resp.status == 200){
                    let conteudo = resp.text();
                    resolve(conteudo);
                }else{
                    reject(Error('Arquivo nao encontrado'));
                }
            })                       
        }else{
            reject(new Error("uri vazia"));
        }
    });

    buscarArquivo.then(function(conteudo){
        document.getElementById('text').innerHTML = conteudo;
        return Error("criado");
    }).catch(function(mensagem){
        console.log(mensagem);
    })
}