const inquirer = require("inquirer")
const chalk = require ("chalk")



// modulos internos
const fs = require ("fs");

// chamando a função principal
operation();

// Função principal  que exibe
function operation (){
    inquirer.prompt([    
        {
        type: "list",
        name: "action",
        message: "O que desejar fazer?",
        choices: [
            "Criar conta",
            "Consultar saldo",
            "Depositar",
            "Sacar",
            "Sair",
        ],
        },
    ])
    .then ((anwer) => {
        const action = anwer ["action"];

    if(action === "Criar conta"){
        createAccounts();
    } else if(action === "Depositar"){
        deposit();
    } else if(action === "Consultar saldo"){
        
    } else if(action === "Sacar"){
        
    } else if(action === "Sair"){
        console.log(chalk.bgBlue.black("Obrigado por usar nosso banco"))
        process.exit(); // Comando para encerra o programa
        
    }
    })
    .catch ((err) => console.log (err));
}

// Função para criar uma conta 
function createAccounts(){
    console.log(chalk.bgGreen.black("Parabéns por escolher o nosso banco!"))
    console.log(chalk.green("Defina as opções da sua conta a seguir."))
    buildAccount();
}

function buildAccount(){
    inquirer.prompt([
        {
        name: "AccountName",
        message: "Digite um nome para a sua conta"
        }
    ])
    .then((answer) => {
        const accountName = answer["accountName"];

        //verifica se a pasta account existe.
        if(!fs.existsSync("accounts")) {
            fs.mkdirSync("accounts");
        }
        //verifica se a conta já existe
        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black("Está conta já existe, escolha outra conta"))
            buildAccount() //se já exister, pede para criar novamente.
            return;
        }
        fs.writeFileSync (
           ` accounts/${accountName}.json`,
            {"balance": 0},
            function(err){
                console.log(err);
    } 
    );
    console.log(chalk.green(`Sua conta ${accountName} foi criado com sucesso!`));
    //volta para o princcipal
    operation();
})
    .catch((err) => console.log(err));  
}
// adicionar um valor à conta do usuário 
function deposit() { 
    inquirer.prompt([
    { 
    name: "accountName", 
    message: "Qual o nome da sua conta?", 
    } 
    ]) 
    .then((answer) => { 
    const accountName = answer["accountName"]; 
    //Verifique se a conta existe 
    if (!checkAccount(accountName)) { 
    return deposit(); 
    } 

    inquirer.prompt([
        {
        name: "amount",
        message: "Quanto deseja depositar?",
        },
        ]).then(answer => {
        
        const amount = answer ["amount"];
        
        // Adicionar um valor
        
        addAmount (accountName, amount);
        operation();
        
        }).catch((err) => console.log(err));
    })
 .catch((err) => console.log(err));   
        
}

function checkAccount (accountName) { 
if (!fs.existsSync(`accounts/${accountName}.json`)) { 
    console.log(chalk.bgRed.black("Esta conta nao existe, escolha outro nome!")); 
    return false; 
    } 
    return true; 
    }

    function addAmount (accountName, amount) {

        const accountData = getAccount (accountName);
        
        if(!amount) {
        
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente"));
        
        return deposit();
        
        }
        
        accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
        
        fs.writeFileSync(
        
        `accounts/${accountName}.json`,
        
        JSON.stringify (accountData),
        
        function (err) {
        
        console.log(err);
        
        },
    )    
        console.log(chalk.green (`Foi depositado $(amount) na sua conta!`), 
    )
}
function checkAccount (accountName) {

    if(!fs.existsSync(`accounts/${accountName}.json`)) {
    
    console.log(chalk.bgRed.black("Esta conta nao existe, escolha outro nome!"));
    
    return false;
    
    }
    
    return true;
    
    }

    function addAmount (accountName, amount) {

        const accountData = getAccount (accountName);
        
        if(!amount) {
        
        console.log(chalk.bgRed.black("Ocorreu um erro, tente novamente"));
        
        return deposit();
        
        }
        
        accountData.balance = parseFloat(amount) + parseFloat (accountData.balance);
        
        fs.writeFileSync(
        
        `accounts/$(accountName}.json`,
        
        JSON.stringify(accountData),
        
        function (err) {
        
        console.log(err);
        
        },
    )
        
        
        
        console.log(chalk.green (`Foi depositado ${amount} na sua conta!`),
)
    }

    function getAccount (accountName) {

        const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        
        encoding: "utf8", 
        flag: "r",
        
        });
        
        return JSON.parse(accountJSON);
        
        }