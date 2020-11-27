// Create a secrets.js file and export your mongo_url like this:
// const MONGO_URL =
//   "mongodb+srv://user:password@cluster0.onwqw.mongodb.net/banco?retryWrites=true&w=majority";

// module.exports = {
//   MONGO_URL: MONGO_URL,
// };
const secrets = require("./secrets");

// importação do módulo do express para o node
const express = require("express");

// Importação do módulo do body-parser para realizar o trabalho com o json que será enviado pelo cliente
const bodyParser = require("body-parser");

// importação do mongoose para realizar a persistencia com mongodb
const mongoose = require("mongoose");

// vamos estabelecer a conexao com o banco de dados mongodb
mongoose.connect(secrets.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Criação do esquema de dados da tabela. Campos da tabela
const tabela = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  cpf: { type: String, required: true },
  telefone: String,
  idade: { type: Number, min: 16, max: 120 },
  usuario: { type: String, unique: true },
  senha: String,
  datacadastro: { type: Date, default: Date.now },
});

// construção da tabela com o comando model
const Cliente = mongoose.model("cliente", tabela);

// utilizar o express na nossa aplicação
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  Cliente.find((erro, dados) => {
    if (erro) {
      res.status(404).send({ rs: `Erro ao tentar listar os clientes ${erro}` });
      return;
    }
    res.status(200).send({ rs: dados });
  });
});

app.post("/cadastro", (req, res) => {
  const dados = new Cliente(req.body);

  dados
    .save()
    .then(() => {
      res.status(201).send({ rs: "Dados cadastrados" });
    })
    .catch((erro) =>
      res.status(400).send({ rs: `Erro ao tentar cadastrar ${erro}` })
    );
});

app.put("/atualizar/:id", (req, res) => {
  Cliente.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (erro, dados) => {
      if (erro) {
        res.status(400).send({ rs: `Erro ao atualizar ${erro}` });
        return;
      }
      res.status(200).send({ rs: dados });
    }
  );
});

app.delete("/apagar/:id", (req, res) => {
  Cliente.findByIdAndDelete(req.params.id, (erro, dados) => {
    if (erro) {
      res.status(400).send(`Erro ao tentar apagar o cliente ${erro}`);
      return;
    }
    res.status(204).send({ rs: "Apagado" });
  });
});

// Vamos adicionar um tratamento ao erro de requisição inexistente, ou seja, o erro 404
app.use((req, res) => {
  res.type("application/json");
  res.status(404).send({ erro: "404 - Página não encontrada" });
});

// Vamos adicionar um tratamento ao erro de requisição inexistente, ou seja, o erro 404
app.use((req, res) => {
  res.type("application/json");
  res.status(404).send({ erro: "404 - Página não encontrada" });
});

app.listen(3000);

console.log("Servidor Online... Para finalizar utilize CTRL+C");
