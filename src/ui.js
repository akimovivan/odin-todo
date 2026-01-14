/** @module ui */

import { Todo, createProject, projects } from "./todos";

let selectedProject = "default";

/**
 * Creates basic structure
 * @param {HTMLElement} app
 * @param {string[]} projects
 * */
function initializeUI(app, projects) {
  const projectMenu = document.createElement("div");
  projectMenu.id = "projectMenu";
  app.appendChild(projectMenu);

  const todoHolder = document.createElement("div");
  todoHolder.id = "todoHolder";
  app.appendChild(todoHolder);

  updateContents(true, projects);
}

/**
 * Form for todo creation
 * @param {HTMLElement} modal - Modal for appending form
 */
function openTodoForm(modal) {
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
    if (project === selectedProject) {
      option.selected = true;
    }
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
  submitBtn.addEventListener("click", () => {
    const form = document.forms[0];
    new Todo(
      form.elements.title.value,
      form.elements.description.value,
      "", // TODO: add date handling
      form.elements.selectPriority.value,
      form.elements.selectProject.value,
    ).save();

    updateContents(true, null);
    modal.close();
  });
  form.appendChild(submitBtn);

  modal.innerHTML = "";
  const closeModalBtn = document.createElement("span");
  closeModalBtn.innerHTML = "&times;";
  closeModalBtn.classList.add("close");
  closeModalBtn.addEventListener("click", () => closeModal(modal));
  modal.appendChild(closeModalBtn);

  modal.appendChild(form);
  modal.showModal();
}

/**
 * Close todo modal
 * @param {HTMLDialogElement} modal
 * */
function closeModal(modal) {
  modal.close();
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
  closeModalBtn.addEventListener("click", closeModal(modal));
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
 * @param {boolean} todos
 * @param {string[] | null} projects
 */
function updateContents(todos, projects) {
  const projectMenu = document.querySelector("#projectMenu");
  const todoHolder = document.querySelector("#todoHolder");

  if (projects) {
    projects = projects.sort();
    projectMenu.innerHTML = "";
    for (const project of projects) {
      const newProject = document.createElement("div");
      newProject.innerText = project;
      newProject.classList.add("project-item");
      if (project === selectedProject) {
        newProject.classList.add("selected-project");
      }
      projectMenu.append(newProject);
    }
  }

  if (todos == false) {
    return;
  }
  todoHolder.innerHTML = "";
  for (const todo of Todo.getTodosByProject(selectedProject)) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("todo-item");

    const newTodoTitle = document.createElement("div");
    newTodoTitle.name = todo.title;
    newTodoTitle.innerText = "Title: " + todo.title;

    const newTodoDescription = document.createElement("div");
    newTodoDescription.classList.add("todo-description");
    newTodoDescription.innerText = "Description: " + todo.description;

    const checkboxWrapper = document.createElement("div");
    const checkboxLabel = document.createElement("label");
    checkboxLabel.innerText = " Done";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = todo.title;
    checkbox.checked = todo.done;

    checkboxWrapper.appendChild(checkbox);
    checkboxWrapper.appendChild(checkboxLabel);

    const todoButtons = document.createElement("div");
    todoButtons.classList.add("todo-buttons");

    const editButton = document.createElement("button");
    editButton.innerText = "Edit";

    editButton.addEventListener("click", () => {
      openEditTodoForm(modal, todo);
    });

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      Todo.deleteTodo(todo.title);
      updateContents(true);
    });

    todoButtons.append(editButton, deleteButton);

    checkbox.addEventListener("change", () => {
      todo.toggleStatus();
    });

    wrapper.appendChild(newTodoTitle);
    wrapper.appendChild(newTodoDescription);
    wrapper.appendChild(checkboxWrapper);
    wrapper.appendChild(todoButtons);
    todoHolder.append(wrapper);
  }
}

function openProjectForm(modal) {
  const form = document.createElement("form");

  // NOTE: On pressing enter form submits which is kinda bad
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const projectLabel = document.createElement("label");
  projectLabel.setAttribute("for", "projectName");
  projectLabel.textContent = "Project name:";
  form.appendChild(projectLabel);

  form.appendChild(document.createElement("br"));

  const projectNameInput = document.createElement("input");
  projectNameInput.type = "text";
  projectNameInput.id = "projectName";
  projectNameInput.name = "projectName";
  form.appendChild(projectNameInput);

  form.appendChild(document.createElement("br"));

  const submitBtn = document.createElement("button");
  submitBtn.id = "submitProject";
  submitBtn.type = "button";
  submitBtn.innerText = "Create Project";
  submitBtn.addEventListener("click", () => {
    createProject(form.elements.projectName.value);
    updateContents(false, projects);
    modal.close();
  });
  form.appendChild(submitBtn);

  modal.innerHTML = "";
  const closeModalBtn = document.createElement("span");
  closeModalBtn.innerHTML = "&times;";
  closeModalBtn.classList.add("close");
  closeModalBtn.addEventListener("click", () => closeModal(modal));
  modal.appendChild(closeModalBtn);

  modal.appendChild(form);
  modal.showModal();
}

/**
 * @param {string} project
 */
function changeSelectedProject(project) {
  selectedProject = project;
  updateContents(true, projects);
}

/**
 * @param {HTMLDialogElement} modal
 * @param {Todo} todo
 */
function openEditTodoForm(modal, todo) {
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
  titleInput.value = todo.title;
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
  descriptionInput.value = todo.description;
  form.appendChild(descriptionInput);

  form.appendChild(document.createElement("br"));

  const selectProject = document.createElement("select");
  selectProject.id = "selectProject";
  selectProject.name = "selectProject";
  form.appendChild(selectProject);

  for (const project of projects) {
    const option = document.createElement("option");
    option.value = project;
    if (project === todo.project) {
      option.selected = true;
    }
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
    if (i === todo.priority) {
      option.selected = true;
    }
  }

  form.appendChild(document.createElement("br"));

  const submitBtn = document.createElement("button");
  submitBtn.id = "submitTodo";
  submitBtn.type = "button";
  submitBtn.innerText = "Edit Todo";
  submitBtn.addEventListener("click", () => {
    Todo.editTodo(
      new Todo(
        form.elements.title.value,
        form.elements.description.value,
        "", // TODO: add date handling
        form.elements.selectPriority.value,
        form.elements.selectProject.value,
      ),
    );

    modal.close();
    updateContents(true, null);
  });
  form.appendChild(submitBtn);

  modal.innerHTML = "";
  const closeModalBtn = document.createElement("span");
  closeModalBtn.innerHTML = "&times;";
  closeModalBtn.classList.add("close");
  closeModalBtn.addEventListener("click", () => closeModal(modal));
  modal.appendChild(closeModalBtn);

  modal.appendChild(form);
  modal.showModal();
}

export {
  openProjectForm,
  openTodoForm,
  updateTodoModal,
  initializeUI,
  changeSelectedProject,
};
