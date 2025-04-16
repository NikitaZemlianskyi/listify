export class Task {
    constructor(text) {
        if (!text || typeof text !== 'string' || text.trim() === '') {
            throw new Error('Task text cannot be empty');
        }
        this.id = `task-${crypto.randomUUID()}`;
        this.text = text.trim();
        this.completed = false;
        this.createdAt = new Date().toISOString();
    }
}

export class TaskList {
    constructor(title) {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('List title cannot be empty');
        }
        this.title = title.trim();
        this.tasks = [];
        this.createdAt = new Date().toISOString();
    }

    addTask(task) {
        if (!(task instanceof Task)) {
            throw new Error('Invalid task object');
        }
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }
}