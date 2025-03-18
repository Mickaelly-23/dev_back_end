const fs = require("fs");

console.log("Início");

fs.writeFile("arquivo2.txt", "Olá Mundo!", function(err){
    setTimeout(function(){
        console.log("Arquivo criado!");
    }, 1000);
})

console.log("Fim");