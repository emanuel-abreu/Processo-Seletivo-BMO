const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function createLogin(request, response) {
  try {
    const userDatabase = await User.findOne({
      where: {
        email: request.body.email,
      },
    });
    // verificar nome de usuario
    if (!userDatabase) {
      return response.status(403).json({ message: "Credenciais incorretas" });
    }
    // retorna true se bater a senha passada no body
    const passwordIsValid = await bcrypt.compare(
      request.body.password,
      userDatabase.password
    );

    // verifica se a senha está correta
    if (!passwordIsValid) {
      return response.status(404).json({ message: "Credenciais incorretas" });
    }

    // gerou o token injetando o id do usuario
    // chave secreta e o tempo que o token vai ficar válido
    const token = jwt.sign(
      {
        id: userDatabase.id,
      },
      process.env.CHAVE_DO_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    response.status(201).json({ name: userDatabase.name, token: token });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Não conseguimos processar a sua solicitação" });
  }
}

module.exports = createLogin;
