function renderTask(task) {
    const taskText = `<li class="container__list-item${task.completed ? ' completed' : ''}" data-id="${task.id}">
          <input class="list-item__checkbox" type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} />
          <label class="list-item__name" for="${task.id}">${task.text}</label>
          <button class="list-item__delete-btn">Delete</button>
        </li>`;
    return taskText;
}

function addTaskToDOM(taskElement, listContainer) {
    if (taskElement) {
        $(listContainer).find('.container__list').append(taskElement);
    }
}

function removeTaskFromDOM(taskElement) {
    if (taskElement) {
        taskElement.remove();
    }
}

function renderList(title) {
    if (!title) {
        alert('Error: Empty list title!');
        return null;
    }
    const list = `<div class="container">
      <h2 class="container__title">${title}</h2>
      <div class="container__form">
        <input type="text" class="form__input" placeholder="Add a task" />
        <button class="form__submit">+</button>
      </div>
      <ul class="container__list"></ul>
    </div>`;
    return list;
}

function addListToDOM(list) {
    if (list) {
        $('.todo__creation').after(list);
    }
}

export { renderTask, addTaskToDOM, removeTaskFromDOM, renderList, addListToDOM };