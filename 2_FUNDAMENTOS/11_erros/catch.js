const x = 10

try{
  x = 2 // Isso causa um erro, pois X é uma constante
} catch (err){
    console.log(`Erro: ${err}`);
}