const User = require("../../models/user");

async function updatedUser(request, response) {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) {
      return response.status(404).json({
        message:
          "Não encontramos o cadastro do usuário, verifique se foi informado corretamente",
      });
    }

    user.name = request.body.name || user.name;
    user.cpf = request.body.cpf || user.cpf;
    user.email = request.body.email || user.email;
    user.password = request.body.password || user.password;
    user.phone = request.body.phone || user.phone;

    if (request.body.name === "") {
      return res.status(400).json({
        message: "O campo 'Nome' é obrigatório",
      });
    } else if (request.body.cpf === "") {
      return res.status(400).json({
        message:
          "O campo 'CPF' é obrigatório e deve ser preenchido corretamente. (Ex: xxx.xxx.xxx-xx)",
      });
    } else if (request.body.email === "") {
      return res.status(400).json({
        message:
          "O campo 'email' é obrigatório e deve ser preenchido corretamente.",
      });
    } else if (request.body.password === "") {
      return res.status(400).json({
        message:
          "O campo 'Senha' é obrigatório e deve ser preenchido corretamente, com no mínimo 8 caractéres",
      });
    }

    await user.save();
    response.status(200).json(user);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Não consiguimos processar a solicitação" });
  }
}

module.exports = updatedUser;
