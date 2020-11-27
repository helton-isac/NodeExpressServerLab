// importação do módulo do express para o node
const express = require("express");

// Importação do módulo do body-parser para realizar o trabalho com o json que será enviado pelo cliente
const bodyParser = require("body-parser");

// utilizar o express na nossa aplicação
const app = express();

app.get("/",(req,res)=>{
    // 200 - Success
    res.status(200).send({rs:"você está no método Get"})
})

app.post("/cadastro",(req,res)=>{
    // 201 - Created
    res.status(201).send({rs:"você está no método Post"})
})

app.put("/atualizar/:id",(req,res)=>{
    // 200 - Success
    res.status(200).send({rs:"você está no método Put"})
})

app.delete("/apagar/:id",(req,res)=>{
    // A resposta não será exibida por conta do status 204 - No Content
    res.status(204).send({rs:"você está no método Delete"})
})

// Vamos adicionar um tratamento ao erro de requisição inexistente, ou seja, o erro 404
app.use((req,res)=>{
    res.type('application/json');
    res.status(404).send({erro:"404 - Página não encontrada"})
})



app.listen(3000)

console.log("Servidor Online... Para finalizar utilize CTRL+C")