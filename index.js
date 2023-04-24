const express = require("express");

const connection = require("./src/database");

const createLogin = require("./src/controllers/users/createLogin");
const validadeNewUser = require("./src/middlewares/validadeNewUser");
const createUser = require("./src/controllers/users/createUser");
const updatedUser = require("./src/controllers/users/updateUser");
const listUsers = require("./src/controllers/users/listUsers");
const deleteUser = require("./src/controllers/users/deleteUser");

const app = express();

app.use(express.json());
connection.authenticate();

connection.sync({ alter: true });

app.post("/users/login", createLogin);

app.post("/users", validadeNewUser, createUser);

app.get("/users", listUsers);

app.put("/users/:id", updatedUser);

app.delete("/users/:id", deleteUser);

app.listen(3333, () => console.log("Aplicação online"));
