/** @module ui */

import { Todo, projects } from "./todos";

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

export { createTodoForm, updateTodoModal };
