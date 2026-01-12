/** @module ui */

import { Todo } from "./todos";

/**
 * Form for todo creation
 * @constructor
 * @returns {HTMLFormElement} Created form
 */
function createTodoForm() {
  const form = document.createElement("form");
  form.innerHTML = `
<label for="title">Title:</label><br>
<input type="text" id="title" name="title"><br>

<label for="description">Description:</label><br>
<input type="text" id="description" name="description"><br>

<button id="submitTodo" type="button">Create Todo</button>
`;
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
  title.innerHTML = `<div>Title: ${todo.title}</div>`;
  modal.appendChild(title);

  const description = document.createElement("div");
  description.innerHTML = `<div>Description: ${todo.description}</div>`;
  modal.appendChild(description);
}

export { createTodoForm, updateTodoModal };
