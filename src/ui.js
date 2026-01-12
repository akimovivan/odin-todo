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

/**
 * modal window with todo details
 * @param {HTMLElement} modal - Modal to update
 * @param {Todo} todo - Todo to display
 */
function updateTodoModal(modal, todo) {
  modal.innerHTML = `
<div>Title: ${todo.title}</div>
<div>Description: ${todo.description}</div>
`;
}

export { createTodoForm, updateTodoModal };
