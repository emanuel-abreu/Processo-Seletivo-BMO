const User = require("../../models/user");

async function deleteUser(request, response) {
  try {
    const user = await User.findByPk(request.params.id);
    if (!user) {
      return response.status(404).json({
        message:
          "Não encontramos o cadastro do usuário, verifique se foi informado corretamente",
      });
    }

    await User.destroy({
      where: {
        id: request.params.id,
      },
    });

    response.status(200).json({ message: "Deletado com sucesso" });
  } catch (error) {
    response
      .status(500)
      .json({ message: "Não consiguimos processar a solicitação" });
  }
}

module.exports = deleteUser;
