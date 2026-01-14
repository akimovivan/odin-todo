import "./style.css"
import "normalize.css/normalize.css"
import { todos, projects, createProject, getFromStorage } from "./todos.js"
import {
  changeSelectedProject,
  initializeUI,
  openProjectForm,
  openTodoForm,
} from "./ui.js"

const app = document.querySelector("#app")

getFromStorage()
createProject("default")

initializeUI(app, projects)

const modal = document.querySelector("#modal")

document
  .getElementById("todoFormBtn")
  .addEventListener("click", () => openTodoForm(modal))

document
  .getElementById("projectFormBtn")
  .addEventListener("click", () => openProjectForm(modal, todos))

document.getElementById("projectMenu").addEventListener("click", (e) => {
  changeSelectedProject(e.target.innerText)
})
