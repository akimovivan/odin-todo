import "./style.css";
import {
  Todo,
  todos,
  projects,
  createProject,
  getFromStorage,
} from "./todos.js";

getFromStorage();

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
    checkbox.checked = item.checked;

    checkbox.addEventListener("change", () => {
      item.toggleStatus();
      console.log(item.done);
      for (const todo of todos) {
        console.log(`Title: ${todo.title}, Status: ${todo.done}`);
      }
    });

    wrapper.append(checkbox);
    wrapper.append(newTodo);
    tds.append(wrapper);
  }
}

document.querySelector("#app").innerHTML = `
<h1>Todo app</h1>
<h2>Projects</h2>
<div id="projects"></div>
<h2>Todos</h2>
<div id="todos"></div>
<button id="createTodo">Create todo</button>
`;
updateContents();

// setupCounter(document.querySelector("#counter"));

document
  .querySelector("#createTodo")
  .addEventListener("click", function createTodo() {
    const todo = new Todo("sas", "velik", "gae", "max", "");
    createProject("sas_project");
    console.log(todos);
    console.log(projects);
    updateContents();
  });
