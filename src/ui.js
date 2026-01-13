/** @module ui */

import { Todo, projects } from "./todos";

/**
 * Creates basic structure
 * @param {HTMLElement} app
 * @param {Todo[]} todos
 * @param {string[]} projects
 * */
function generateBaseHTML(app, todos, projects) {
  const projectMenu = document.createElement("div");
  projectMenu.id = "projectMenu";
  app.appendChild(projectMenu);

  const todoHolder = document.createElement("div");
  todoHolder.id = "todoHolder";
  app.appendChild(todoHolder);

  updateContents(todos, projects);
}

/**
 * Form for todo creation
 * @constructor
 * @returns {HTMLFormElement} Created form
 */
function createTodoForm() {
  const form = document.createElement("form");

  const titleLabel = document.createElement("label");
  titleLabel.setAttribute("for", "title");
  titleLabel.textContent = "Title:";
  form.appendChild(titleLabel);

  form.appendChild(document.createElement("br"));

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  form.appendChild(titleInput);

  form.appendChild(document.createElement("br"));

  const descriptionLabel = document.createElement("label");
  descriptionLabel.setAttribute("for", "description");
  descriptionLabel.textContent = "Description:";
  form.appendChild(descriptionLabel);

  form.appendChild(document.createElement("br"));

  const descriptionInput = document.createElement("input");
  descriptionInput.type = "text";
  descriptionInput.id = "description";
  descriptionInput.name = "description";
  form.appendChild(descriptionInput);

  form.appendChild(document.createElement("br"));

  const selectProject = document.createElement("select");
  selectProject.id = "selectProject";
  selectProject.name = "selectProject";
  form.appendChild(selectProject);

  for (const project of projects) {
    const option = document.createElement("option");
    option.value = project;
    option.text = project;
    selectProject.appendChild(option);
  }

  form.appendChild(document.createElement("br"));

  const selectPriority = document.createElement("select");
  selectPriority.id = "selectPriority";
  selectPriority.name = "selectPriority";
  form.appendChild(selectPriority);

  for (let i = 1; i < 5; i++) {
    const option = document.createElement("option");
    option.text = `Priority ${i}`;
    option.value = i;
    selectPriority.appendChild(option);
  }

  form.appendChild(document.createElement("br"));

  const submitBtn = document.createElement("button");
  submitBtn.id = "submitTodo";
  submitBtn.type = "button";
  submitBtn.innerText = "Create Todo";
  form.appendChild(submitBtn);

  return form;
}

/** Close todo modal */
function closeTodoModal() {
  todoModal.style.display = "none";
}

/**
 * modal window with todo details
 * @param {HTMLElement} modal - Modal to update
 * @param {Todo} todo - Todo to display
 */
function updateTodoModal(modal, todo) {
  modal.innerHTML = "";
  const closeModalBtn = document.createElement("span");
  closeModalBtn.innerHTML = "&times;";
  closeModalBtn.classList.add("close");
  closeModalBtn.addEventListener("click", closeTodoModal);
  modal.appendChild(closeModalBtn);

  const title = document.createElement("div");
  title.innerText = `Title: ${todo.title}`;
  modal.appendChild(title);

  const description = document.createElement("div");
  description.innerText = `Description: ${todo.description}`;
  modal.appendChild(description);

  const project = document.createElement("div");
  project.innerText = `Project: ${todo.project}`;
  modal.appendChild(project);

  const priority = document.createElement("div");
  project.innerText = `Priority: ${todo.priority}`;
  modal.appendChild(priority);
}

/**
 * Updates projects and todos
 * @param {Todo[]} todos
 * @param {string[]} projects
 */
function updateContents(todos, projects) {
  const projectMenu = document.querySelector("#projectMenu");
  const todoHolder = document.querySelector("#todoHolder");

  projectMenu.innerHTML = "";
  todoHolder.innerHTML = "";
  for (const project of projects) {
    const newProject = document.createElement("div");
    newProject.innerText = project;
    newProject.classList.add("project-item");
    projectMenu.append(newProject);
  }

  for (const todo of todos) {
    const wrapper = document.createElement("div");
    const newTodo = document.createElement("span");
    newTodo.name = todo.title;
    newTodo.innerText = todo.title;
    newTodo.classList.add("todo-item");

    newTodo.addEventListener("click", () => {
      updateTodoModal(todoModal, todo);
      todoModal.style.display = "block";
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.for = todo.title;
    checkbox.checked = todo.done;

    checkbox.addEventListener("change", () => {
      item.toggleStatus();
    });
    wrapper.append(checkbox);
    wrapper.append(newTodo);
    todoHolder.append(wrapper);
  }
}

export { createTodoForm, updateTodoModal, generateBaseHTML };
