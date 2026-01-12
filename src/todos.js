/** @module todos */

/**
 * Todo object with related objects
 */
class Todo {
  /**
   * @param {string} title - Title of todo
   * @param {string} description - Title of todo
   * @param {string} description - Description of todo
   * @param {string} dueDate - Due date of todo
   * @param {number} priority - Priority of todo
   * @param {string} project - Project to which todo belongs to
   * @param {boolean | null} done - Is todo done
   */
  constructor(title, description, dueDate, priority, project, done = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate; // string for now
    this.priority = priority;
    this.done = done;

    if (projects.includes(project)) {
      this.project = project;
    } else {
      this.project = "";
    }

    todos.push(this);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //toggleStatus changes done status of this todo
  toggleStatus() {
    this.done = !this.done;
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // addToProject returns true if project exists, false otherwise
  addToProject(project) {
    if (projects.includes(project)) {
      this.project = project;
      localStorage.setItem("todos", JSON.stringify(todos));
      return true;
    }
    return false;
  }

  static fromJSON(data) {
    return new Todo(
      data.title,
      data.description,
      data.dueDate,
      data.priority,
      data.project,
      data.done,
    );
  }
}

let projects = [];
let todos = [];

/**
 * Creates project if it does not exist
 * @param {striing} project - Project title
 * @param {() => void} updateFunction - Updates content
 */
function createProject(project, updateFunction) {
  if (!projects.includes(project)) {
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
  if (updateFunction) updateFunction();
}

/** Update todo and projects from values stored in local storage */
function getFromStorage() {
  try {
    projects = JSON.parse(localStorage.getItem("projects"));
    const todosDeconstructed = JSON.parse(localStorage.getItem("todos"));
    todos = [];
    for (const todo of todosDeconstructed) {
      Todo.fromJSON(todo);
    }
  } catch (e) {
    console.error(e);
  }
}

export { projects, todos, Todo, createProject, getFromStorage };
