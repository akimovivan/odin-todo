import "./style.css";
import "normalize.css/normalize.css";
import { todos, projects, createProject, getFromStorage } from "./todos.js";
import { initializeUI, openTodoForm } from "./ui.js";

const app = document.querySelector("#app");

getFromStorage();
createProject("default");

initializeUI(app, todos, projects);

const modal = document.querySelector("#modal");

document
  .getElementById("todoFormBtn")
  .addEventListener("click", () => openTodoForm(modal, todos));
