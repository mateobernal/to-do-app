const Task = require('../models/taskModel');


const home = (req, res) => {
  console.log("req.session.userId", req.session.userId)
  res.render('home');
}

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: res.locals.user }).lean();
  console.log(tasks)
  res.render('tasks/tasksView', { tasks });
}

const createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    user: res.locals.user,
  });
  await task.save();
  req.flash('success', 'Task was succesfully created');
  res.redirect('/tasks');
}


const deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id);
  req.flash('success', 'Task was succesfully deleted');
  res.redirect('/tasks');
}

const getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.render('tasks/editForm', task);
}


const editTask = async (req, res) => {
  const { title, description } = req.body
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, { title, description });
  res.redirect('/tasks');
}


module.exports = {

  home, getTasks, createTask, deleteTask, getTask, editTask,
}