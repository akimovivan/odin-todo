import "./style.css";
import {
  Todo,
  todos,
  projects,
  createProject,
  getFromStorage,
} from "./todos.js";
import { generateBaseHTML, createTodoForm, updateTodoModal } from "./ui.js";

getFromStorage();

createProject("default");

const app = document.querySelector("#app");

// app.appendChild(createTodoForm(app));

console.log(todos, projects);
generateBaseHTML(app, todos, projects);

const todoModal = document.querySelector("#todoModal");

// document.querySelector("#submitTodo").addEventListener("click", () => {
//   const form = document.forms[0];
//   new Todo(
//     form.elements.title.value,
//     form.elements.description.value,
//     "",
//     form.elements.selectPriority.value,
//     form.elements.selectProject.value,
//   );
//   updateContents();
// });
