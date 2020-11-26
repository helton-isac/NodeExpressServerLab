// importação do módulo do express para o node
const express = require("express");

// Importação do módulo do body-parser para realizar o trabalho com o json que será enviado pelo cliente
const bodyParser = require("body-parser");

// utilizar o express na nossa aplicação
const app = express();

app.get("/",(req,res)=>{
    res.status(200).send({rs:"você está no método Get"})
}) 

app.listen(3000)

console.log("Servidor Online... Para finalizar utilize CTRL+C")