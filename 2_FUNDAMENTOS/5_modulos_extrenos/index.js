const minimist = require("minimist");

const args = minimist(process.argv.slice(2));

const nome = args['nome'];
const profissao = args['profissao']

console.log(nome, profissao);
console.log(`O nome dele(a) é ${nome} e ele trabalha como ${profissao}`);