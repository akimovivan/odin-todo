import "./style.css";
import {
  Todo,
  todos,
  projects,
  createProject,
  getFromStorage,
} from "./todos.js";
import { createTodoForm } from "./ui.js";

getFromStorage();

createProject("default");

function updateContents() {
  const proj = document.querySelector("#projects");
  const tds = document.querySelector("#todos");

  proj.innerHTML = "";
  tds.innerHTML = "";
  for (const item of projects) {
    const newProject = document.createElement("div");
    newProject.id = item;

    newProject.innerText = item;
    proj.append(newProject);
  }

  for (const item of todos) {
    const wrapper = document.createElement("div");
    const newTodo = document.createElement("span");
    newTodo.innerText = item.title;
    newTodo.id = item.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.for = item.title;
    checkbox.checked = item.done;

    checkbox.addEventListener("change", () => {
      item.toggleStatus();
      for (const todo of todos) {
        console.log(`Title: ${todo.title}, Status: ${todo.done}`);
      }
    });

    wrapper.append(checkbox);
    wrapper.append(newTodo);
    tds.append(wrapper);
  }
}

const app = document.querySelector("#app");

app.appendChild(createTodoForm(app));

app.innerHTML += `
<h1>Todo app</h1>
<h2>Projects</h2>
<div id="projects"></div>
<h2>Todos</h2>
<div id="todos"></div>
<button id="createTodo">Create todo</button>
`;

updateContents();

document.querySelector("#submitTodo").addEventListener("click", () => {
  const form = document.forms[0];
  new Todo(
    form.elements.title.value,
    form.elements.description.value,
    "",
    3,
    "default",
  );
  updateContents();
});
