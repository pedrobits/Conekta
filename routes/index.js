import contatoController from "./controllers/contatoController.js";
import userController from "./controllers/userController.js";
import middlewares from "./middlewares/index.js";

const routes = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({ API: "Conekta", Versão: 0.1 });
  });

  // user
  app.get("/users", middlewares.verifyJwt, userController.listarUsuarios);
  app.post("/users/create", middlewares.verifyJwt, userController.novoUsuario);
  app.put("/users/edit", middlewares.verifyJwt, userController.editarUsuario);
  app.post("/login", userController.logarUsuario);

  // contatos
  app.get("/contatos", middlewares.verifyJwt, contatoController.listarContatos);
  // app.post("/contatos/create", contatoController.novoContato);
  // app.put("/contatos/edit", contatoController.editarContato);
};

export default routes;
