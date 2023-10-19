import userController from "./controllers/userController.js";

const routes = (app) => {
  app.get("/", (req, res) => {
    res.status(200).send({ API: "Conekta", Versão: 0.1 });
  });

  // user
  app.get("/users", userController.listarUsuarios)
  app.post("/users/create", userController.novoUsuario);
  app.put("/users/edit", userController.editarUsuario)
};

export default routes;
