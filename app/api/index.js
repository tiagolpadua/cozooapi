var db = require("../../config/database");

var api = {};

var token = "aksdfyiuKUHYkasfkUYRn";

api.adiciona = function(req, res) {
  var animal = req.body;
  console.log("Adicionando: ");
  console.log(req.body);
  delete animal._id;
  db.insert(animal, function(err, newDoc) {
    if (err) return console.log(err);
    console.log("Adicionado com sucesso: " + newDoc._id);
    res.json(newDoc._id);
  });
};

api.busca = function(req, res) {
  db.findOne({ _id: req.params.animalId }, function(err, doc) {
    if (err) return console.log(err);
    res.json(doc);
  });
};

api.atualiza = function(req, res) {
  console.log("Parâmetro recebido:" + req.params.animalId);
  db.update({ _id: req.params.animalId }, req.body, function(err, numReplaced) {
    if (err) return console.log(err);
    if (numReplaced) res.status(200).end();
    res.status(500).end();
    console.log("Atualizado com sucesso: " + req.body._id);
    res.status(200).end();
  });
};

api.lista = function(req, res) {
  db.find({})
    .sort({ nome: 1 })
    .exec(function(err, doc) {
      if (err) return console.log(err);
      res.json(doc);
    });
};

api.remove = function(req, res) {
  db.remove({ _id: req.params.animalId }, {}, function(err, numRemoved) {
    if (err) return console.log(err);
    console.log("removido com sucesso");
    if (numRemoved) res.status(200).end();
    res.status(500).end();
  });
};

api.removeLogicamente = function(req, res) {
  db.update(
    { _id: req.params.animalId },
    { $set: { excluido: true } },
    function(err, numReplaced) {
      if (err) return console.log(err);
      if (numReplaced) res.status(200).end();
      res.status(500).end();
      console.log("Excluído logicamente com sucesso: " + req.params.animalId);
      res.status(200).end();
    }
  );
};

api.login = function(req, res) {
  var dados = req.body;

  console.log("logando: ");
  console.log(req.body);

  if (dados.usuario === "jose" && dados.senha === "123456") {
    res.json({
      token: token
    });
  } else {
    res.status(403).end();
  }
};

module.exports = api;
