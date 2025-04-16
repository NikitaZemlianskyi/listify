function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

function renderTask(task) {
    try {
        if (!task || !task.id || !task.text) {
            throw new Error('Invalid task object');
        }

        return `<li class="container__list-item${task.completed ? ' completed' : ''}" data-id="${sanitizeHTML(task.id)}">
            <input class="list-item__checkbox" type="checkbox" id="${sanitizeHTML(task.id)}" ${task.completed ? 'checked' : ''} />
            <label class="list-item__name" for="${sanitizeHTML(task.id)}">${sanitizeHTML(task.text)}</label>
            <button class="list-item__delete-btn" aria-label="Delete task">
                <img src="src/assets/icons/trash.svg" alt="Delete task" />
            </button>
        </li>`;
    } catch (error) {
        console.error('Failed to render task:', error);
        return '';
    }
}

function addTaskToDOM(taskElement, listContainer) {
    try {
        if (!taskElement || !listContainer) {
            throw new Error('Missing required parameters');
        }
        const list = $(listContainer).find('.container__list');
        if (list.length === 0) {
            throw new Error('Container list not found');
        }
        list.append(taskElement);
    } catch (error) {
        console.error('Failed to add task to DOM:', error);
    }
}

function removeTaskFromDOM(taskElement) {
    try {
        if (!taskElement || !taskElement.length) {
            throw new Error('Invalid task element');
        }
        taskElement.fadeOut(200, () => taskElement.remove());
    } catch (error) {
        console.error('Failed to remove task from DOM:', error);
    }
}

function renderList(title) {
    try {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Invalid list title');
        }

        const sanitizedTitle = sanitizeHTML(title.trim());
        return `<div class="container">
            <div class="container__header">
                <h2 class="container__title">${sanitizedTitle}</h2>
                <button class="container__delete-btn" aria-label="Delete list">
                    <img src="src/assets/icons/cross.svg" alt="Delete list" />
                </button>
            </div>
            <div class="container__form">
                <input type="text" class="form__input" placeholder="Add a task" aria-label="New task text" />
                <button class="form__submit" aria-label="Add task">+</button>
            </div>
            <ul class="container__list" role="list"></ul>
        </div>`;
    } catch (error) {
        console.error('Failed to render list:', error);
        return null;
    }
}

function addListToDOM(list) {
    try {
        if (!list) {
            throw new Error('Invalid list HTML');
        }
        $('.lists').append(list);
    } catch (error) {
        console.error('Failed to add list to DOM:', error);
    }
}

export { renderTask, addTaskToDOM, removeTaskFromDOM, renderList, addListToDOM };