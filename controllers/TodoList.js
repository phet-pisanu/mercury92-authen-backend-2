const db = require("../models");
const bc = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getTodos = async (req, res) => {
  const todolists = await db.Todolist.findAll({
    where: { user_id: req.user.id },
  });
  res.status(200).send(todolists);
};
const getTodoById = async (req, res) => {
  const targetTodoId = req.params.id;
  const targetTodo = await db.Todolist.findOne({
    where: { id: targetTodoId, user_id: req.user.id },
  });
  res.status(200).send(targetTodo);
};

const createTodo = async (req, res) => {
  const { task } = req.body;
  const newTodo = await db.Todolist.create({
    user_id: req.user.id,
    task,
  });

  res.status(201).send(newTodo);
};

const deleteTodo = async (req, res) => {
  const targetTodoId = req.params.id;
  const targetTodo = await db.Todolist.findOne({
    where: { id: targetTodoId, user_id: req.user.id },
  });

  if (targetTodo) {
    await targetTodo.destroy();
    res.status(204).send();
  } else {
    res.status(404).send({ message: `Todo ID: ${targetTodoId} Nound Fot` });
  }
};

const updateTodo = async (req, res) => {
  const targetTodoId = req.params.id;
  const targetTodo = await db.Todolist.findOne({
    where: { id: targetTodoId, user_id: req.user.id },
  });

  if (targetTodo) {
    await targetTodo.update({
      task: req.body.task,
    });
    res
      .status(200)
      .send({ message: `Todo ID:${targetTodoId} has been eatduped.` });
  } else {
    res.status(404).send({ message: `Todo ID: ${targetTodoId} Nound Fot` });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  deleteTodo,
  updateTodo,
};
