class Todo {
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

function createProject(project) {
  if (!projects.includes(project)) {
    projects.push(project);
    localStorage.setItem("projects", JSON.stringify(projects));
  }
}

function getFromStorage() {
  try {
    projects = JSON.parse(localStorage.getItem("projects"));
    const todosDeconstructed = JSON.parse(localStorage.getItem("todos"));
    todos = [];
    for (const todo of todosDeconstructed) {
      console.log(todo.done);
      Todo.fromJSON(todo);
    }
  } catch (e) {
    console.error(e);
  }
}

export { projects, todos, Todo, createProject, getFromStorage };
