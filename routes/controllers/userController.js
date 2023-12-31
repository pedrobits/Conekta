import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  static listarUsuarios = async (_req, res) => {
    try {
      const listaUsuarios = await User.find({}, "-password"); // Use 'await' para esperar a consulta ser concluída

      if (listaUsuarios.length === 0) {
        return res.status(200).send("Não há usuários");
      } else {
        return res.status(200).send(listaUsuarios);
      }
    } catch (error) {
      return res.status(500).send("Erro ao listar usuários: " + error.message);
    }
  };

  static novoUsuario = async (req, res) => {
    const { name, email, profilePhoto, password } = req.body;

    try {
      if (!name || !email || !password) {
        return res.status(400).json({
          erro: "Sim",
          mensagem: "Dados inválidos, verifique os campos do novo usuário.",
        });
      }

      const emailExists = await User.find({
        email: email,
      });

      if (emailExists.length > 0) {
        return res
          .status(400)
          .send({ Erro: "sim", message: "Usuario já cadastrado." });
      }

      const saltRounds = 10;

      // Gere um salt
      const salt = await bcrypt.genSalt(saltRounds);

      // Gere o hash da senha usando o salt
      const passwordHash = await bcrypt.hash(password, salt);

      // Crie um novo usuário com os dados fornecidos
      const novoUsuario = new User({
        name,
        email,
        profilePhoto,
        password: passwordHash,
      });

      // Salve o novo usuário no banco de dados
      await novoUsuario.save();

      return res.status(201).json({
        sucesso: "Sim",
        mensagem: "Novo usuário cadastrado com sucesso.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        erro: "Sim",
        mensagem: "Ocorreu um erro ao criar o novo usuário.",
      });
    }
  };

  static editarUsuario = async (req, res) => {
    const { id, name, email } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ erro: "Sim", mensagem: "Id não informado" });
    }

    try {
      const updateFields = {};

      if (name) {
        updateFields.name = name;
      }

      if (email) {
        updateFields.email = email;
      }

      const result = await User.findOneAndUpdate({ _id: id }, updateFields, {
        new: true,
      });

      if (result) {
        return res.status(200).json({
          sucesso: "Sim",
          mensagem: "Usuário editado com sucesso.",
          usuario: result,
        });
      } else {
        return res.status(404).json({
          erro: "Sim",
          mensagem: "Usuário não encontrado.",
        });
      }
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        erro: "Sim",
        mensagem: "Ocorreu um erro ao editar o usuário.",
      });
    }
  };

  static logarUsuario = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ erro: "Sim", mensagem: "Dados inválidos" });
    }

    try {
      // Encontre o usuário com o e-mail fornecido
      const user = await User.findOne({ email: email });

      if (!user) {
        return res
          .status(400)
          .json({ erro: "Sim", mensagem: "Usuário não encontrado" });
      }

      // Acesse a senha do usuário a partir do resultado da consulta
      const storedPasswordHash = user.password;

      // Compare a senha fornecida com a senha armazenada no banco de dados
      const senhaCorreta = await bcrypt.compare(password, storedPasswordHash);

      if (senhaCorreta) {
        // Crie um token JWT
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
            nome: user.nome, // Adicione os campos que você deseja incluir
          },
          process.env.HashJWT,
          {
            expiresIn: "300d",
          }
        );

        // Retorne o token no corpo da resposta
        return res.status(200).json({
          sucesso: "Sim",
          usuario: user,
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ erro: "Sim", mensagem: "Senha incorreta" });
      }
    } catch (error) {
      console.error("Erro:", error);
      return res.status(500).json({
        erro: "Sim",
        mensagem: "Ocorreu um erro ao tentar fazer login.",
      });
    }
  };
}

export default UserController;
