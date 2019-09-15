var api = require("../api"),
  path = require("path");

module.exports = function(app) {
  app
    .route("/v1/animais")
    .post(api.adiciona)
    .get(api.lista);

  app
    .route("/v1/animais/:animalId")
    .delete(api.remove)
    .get(api.busca)
    .put(api.atualiza);

  app
    .route("/v1/animais/exclusaologica/:animalId")
    .delete(api.removeLogicamente);

  app.route("/v1/login").post(api.login);

  app.all("/*", function(req, res) {
    res.sendFile(path.join(app.get("publicPath"), "index.html"));
  });
};
