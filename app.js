// Constants
const icons = {
  complete: '<i class="fa-regular fa-square-check"></i>',
  deleted: '<i class="fa-solid fa-xmark"></i>',
  checkbox: '<i class="fa-regular fa-square"></i>'
}


// State Variables
let todos;


// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const error = document.querySelector('.error')


// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrComplete);


// Functions
function addTodo(evt) {
  // Prevent form from submitting 
  evt.preventDefault();
  error.innerText = '';

  // error for empty string entry
  if(!todoInput.value) {
    error.innerText = 'Please enter a todo!'

  } else {
    // create div container for todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // create completed button
    todoDiv.appendChild(createCompleteBtn());

    // create li for todo item
    const newTodo = createLiItem(todoInput.value);
    todoDiv.appendChild(newTodo);
    
    // delete button
    todoDiv.appendChild(createDeleteBtn());

    // add todo to list
    todoList.appendChild(todoDiv);

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // clear input value
    todoInput.value = '';
  }
};


function deleteOrComplete(evt) {
  const item = evt.target; // this returns the entire button
  // delete todo
  if(item.classList[0] === 'delete-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo)
    // remove todo once transition has finished
    todo.addEventListener('transitionend', evt => {
      todo.remove();
    })
  }

  // mark as complete
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');

    // add new classname to toggle icon
    item.classList.toggle('complete');

    // toggle icon from empty box to checked based on 'complete' class
    item.innerHTML = item.classList[1] === 'complete' 
      ? icons['complete'] 
      : icons['checkbox'];
  }
}


function saveLocalTodos(todo) {
  // check if there are already todos saved
  checkLocalStorage();
  // push new todo to array
  todos.push(todo);
  // set it back to local storage
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos() {
  // check if there are already todos saved
  checkLocalStorage();
  todos.forEach(todo => {
    // create div container for todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
  
    // create complete button
    todoDiv.appendChild(createCompleteBtn());

    // create li for todo item
    const newTodo = createLiItem(todo);
    todoDiv.appendChild(newTodo);

    // create delete button
    todoDiv.appendChild(createDeleteBtn());

    // add todo to list
    todoList.appendChild(todoDiv);
  })
}


function removeLocalTodos(todo) {
  checkLocalStorage();
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function checkLocalStorage() {
  // if our todo array exists parse, else create
  return todos = localStorage.getItem('todos')
    ? JSON.parse(localStorage.getItem('todos'))
    : []
}


// Helper Functions
function createLiItem(todo) {
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  return newTodo;
}


function createCompleteBtn() {
  // completed button
  const completeBtn = document.createElement('button');
  completeBtn.innerHTML = icons['checkbox'];
  completeBtn.classList.add('complete-btn');
  return completeBtn;
}


function createDeleteBtn() {
  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = icons['deleted'];
  deleteBtn.classList.add('delete-btn');
  return deleteBtn;
}


// Live Time
function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " ");
  timeDisplay.textContent = formattedString;
}

refreshTime();

setInterval(refreshTime, 1000);