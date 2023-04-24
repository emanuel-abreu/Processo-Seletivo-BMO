const User = require("../../models/user");

async function listUsers(request, response) {
  try {
    const users = await User.findAll();
    response.status(200).json(users);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Não consiguimos processar a solicitação" });
  }
}

module.exports = listUsers;
