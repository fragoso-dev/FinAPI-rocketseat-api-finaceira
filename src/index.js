const express = require("express");
const { v4: UUIDV4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const id = UUIDV4();

  customers.push({
    cpf,
    name,
    id,
    statement: [],
  });

  return response.status(201).send();
});

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((customer) => customer.cpf === cpf);

  if (!customer) {
    return response
      .status(400)
      .json({ error: "Não foi encontrado dados para esse cpf!" });
  }

  return response.json(customer.statement);
});

app.listen(3333);
