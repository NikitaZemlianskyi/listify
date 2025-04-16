export default class Task {
    static nextId = 1;

    constructor(text) {
        this.id = `task-${Task.nextId++}`;
        this.text = text;
        this.completed = false;
    }
}

export class TaskList {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
}