const express = require("express");
const { v4: UUIDV4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "cpf Já cadastrado!" });
  }

  customers.push({
    cpf,
    name,
    id: UUIDV4(),
    statement: [],
  });

  return response.status(201).send();
});

app.listen(3333);
