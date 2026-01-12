/** @module ui */

/**
 * Adds an form to create a todo to a parent
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

export { createTodoForm };
