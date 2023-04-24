const yup = require("yup");

const validation = yup.object().shape({
  name: yup
    .string("O nome  deve ser uma string")
    .required("Nome é obrigatório no cadastro do usuário"),
  cpf: yup
    .string("O nome  deve ser uma string")
    .matches(
      /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/,
      "CPF inválido, deve teer o seguinte formato: xxx.xxx.xxx-xx"
    )
    .min(14, "O CPF deve ter no mínimo 14 caracteres")
    .required("CPF é obrigatório no cadastro do usuário"),
  password: yup
    .string()
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .required("Senha é obrigatória"),
  email: yup
    .string("O email deve ser uma string")
    .email("Formato de email é inválido")
    .required("Email é obrigatório no cadastro do usuário"),
  phone: yup
    .string("O número de telefone deve ser uma string")
    .min(
      11,
      "O número de telefone deve ter no mínimo 11 caracteres. (Ex: XX 9XXXXXXXX)"
    ),
});

async function validadeNewUser(request, response, next) {
  console.log(request.body);

  try {
    await validation.validate(request.body);
    next();
  } catch (error) {
    console.log(error);
    response.status(400).json({ message: error.message });
  }
}

module.exports = validadeNewUser;
