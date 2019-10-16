const express = require("express");
const server = express();
server.use(express.json());
server.use(addReqsDone);

// localhost:3000/teste

// Query params = Enviados no formato de: ?teste=1
// Route params = /users/1
// Request body = { "name": "Matheus" } (informações pra criar um usuario)

// CRUD - Create, Read, Update, Delete

const projects = [];
var cont = 0;

function checkIfProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if (!project) {
    return res.status(400).json({
      error: "A project with ID " + req.params.id + " does not exists!"
    });
  }
  return next();
}

function addReqsDone(req, res, next) {
  cont += 1;
  console.log("Reqs done until now: " + cont);
  return next();
}

//Get - listar todos os projetos
server.get("/projects", (req, res) => {
  return res.json(projects);
});

//Post - add projeto
server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const arrStruct = {
    id,
    title,
    tasks: []
  };
  projects.push(arrStruct);
  return res.json(projects);
});

// Post - add tasks á um projeto
server.post("/projects/:id/tasks", checkIfProjectExists, (req, res) => {
  const { tasks } = req.body;
  const { id } = req.params;
  projects[id].tasks = tasks;
  return res.json(projects);
});

// Put - editar titulo do projeto
server.put("/projects/:id", checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(projects);
});

// Delete - deletar um projeto
server.delete("/projects/:id", checkIfProjectExists, (req, res) => {
  const { id } = req.params;
  projects.splice(id, 1);
  return res.send();
});

server.listen(3000);
