import contato from "../../models/contato.js";

class contatoController {
  static listarContatos = async (req, res) => {
    const userData = req.user;

    const IDUsuarioLogado = userData.userId;

    const contatos = await contato.find({ user: IDUsuarioLogado });

    if (contatos.length === 0) {
      return res.status(200).send("Não há contatos para este usuario.");
    } else {
      return res.status(200).send(contatos);
    }
  };

  static criarContato = async (req, res) => {
    const userData = req.user;

    const IDUsuarioLogado = userData.userId;

    const { name, email, mobile, Tel1, address, birthday, notes, socialMedia } =
      req.body;

    const Contato = new contato({
      name: name,
      email: email,
      mobile: mobile,
      Tel1: Tel1,
      address: address,
      birthday: Date(birthday),
      notes: notes,
      socialMedia: socialMedia,
      user: IDUsuarioLogado,
    });

    Contato.save()
      .then(() => {
        return res.status(200).send("Contato salvo com sucesso");
      })
      .catch((error) => {
        return res
          .status(400)
          .send("Ouve um erro ao salvar o contato: " + error.message);
      });
  };

  static editarContato = async (req, res) => {
    const userData = req.user;
    const IDUsuarioLogado = userData.userId;
  
    const { contatoID, ...camposAtualizados } = req.body;
  
    try {
      const VerificarDonoContato = await contato.findOne({ _id: contatoID, user: IDUsuarioLogado });
  
      if (!VerificarDonoContato) {
        return res.status(404).json({ message: 'Contato não encontrado' });
      }
  
      for (const campo in camposAtualizados) {
        VerificarDonoContato[campo] = camposAtualizados[campo];
      }

      await VerificarDonoContato.save();
  
      return res.status(200).json({ message: 'Contato atualizado com sucesso' });
    } catch (error) {
      return res.status(500).json({ message: 'Ocorreu um erro ao editar o contato: ' + error.message });
    }
  };
}

export default contatoController;
