const User = require("../../models/user");
const bcrypt = require("bcrypt");

async function createUser(request, response) {
  try {
    // criptografar a senha
    const hash = await bcrypt.hash(request.body.password, 10);

    const newUser = {
      name: request.body.name,
      cpf: request.body.cpf,
      email: request.body.email,
      password: hash,
      phone: request.body.phone,
    };

    const userEmail = await User.findOne({
      where: {
        email: request.body.email,
      },
    });

    if (userEmail) {
      return response.status(409).json({
        message: "Já existe um email como esse cadastrado, tente outro.",
      });
    }

    const userCPF = await User.findOne({
      where: {
        cpf: request.body.cpf,
      },
    });

    if (userCPF) {
      return response.status(409).json({
        message: "CPF já está cadastrado",
      });
    }

    const user = await User.create(newUser);

    const { _password, ...userData } = user.toJSON();
    response.status(201).json(userData);
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({ message: "Não conseguimos processar a sua solicitação" });
  }
}

module.exports = createUser;
