const args = process.argv.slice(2);
const nome = args.find(arg => arg.startsWith('nome=')).split('=')[1];
const idade = args.find(arg => arg.startsWith('idade=')).split('=')[1];
console.log(nome);
console.log(idade);

console.log(`O nome dele(a) é ${nome} e ele(a) tem ${idade} anos!`);