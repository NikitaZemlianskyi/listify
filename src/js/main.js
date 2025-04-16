import { renderTask, addTaskToDOM, removeTaskFromDOM, renderList, addListToDOM } from './ui.js';
import { Task, TaskList } from './model.js';
import {
    getListsFromStorage,
    addListToStorage,
    removeListFromStorage,
    addTaskToStorage,
    removeTaskFromStorage,
    updateTaskInStorage
} from './localstorage.js';

const listInput = $('.todo__input');
const listAddButton = $('.todo__button');

// Load saved lists on page load
$(document).ready(function () {
    const savedLists = getListsFromStorage();
    savedLists.forEach(listData => {
        const listElement = renderList(listData.title);
        addListToDOM(listElement);
        const container = $('.container').last();

        listData.tasks.forEach(task => {
            const taskElement = renderTask(task);
            addTaskToDOM(taskElement, container);
        });
    });
});

// Event delegation for handling task creation in specific lists
$(document).on('click', '.form__submit', function (event) {
    const container = $(event.target).closest('.container');
    const input = container.find('.form__input');
    const task = new Task(input.val());
    const listTitle = container.find('.container__title').text();

    if (task.text) {
        const taskElement = renderTask(task);
        addTaskToDOM(taskElement, container);
        addTaskToStorage(listTitle, task);
        input.val('');
    }
    else {
        alert('Error: Empty task!');
    }
});

// Event delegation for handling task deletion
$(document).on('click', '.list-item__delete-btn', function (event) {
    const taskElement = $(event.target).closest('.container__list-item');
    const taskId = taskElement.data('id');
    const listTitle = taskElement.closest('.container').find('.container__title').text();

    removeTaskFromDOM(taskElement);
    removeTaskFromStorage(listTitle, taskId);
});

// Handle list creation
listAddButton.on('click', function (event) {
    const listTitle = listInput.val();
    if (listTitle) {
        const listElement = renderList(listTitle);
        addListToDOM(listElement);
        const newList = new TaskList(listTitle);
        addListToStorage(newList);
        listInput.val('');
    }
    else {
        alert('Error: Empty list title!');
    }
});

// Handle list deletion
$(document).on('click', '.container__delete-btn', function (event) {
    const container = $(event.target).closest('.container');
    const listTitle = container.find('.container__title').text();

    container.remove();
    removeListFromStorage(listTitle);
});

// Handle task completion toggling
$(document).on('change', '.list-item__checkbox', function (event) {
    const checkbox = $(event.target);
    const taskElement = checkbox.closest('.container__list-item');
    const taskId = taskElement.data('id');
    const listTitle = taskElement.closest('.container').find('.container__title').text();
    const isCompleted = checkbox.prop('checked');

    if (isCompleted) {
        taskElement.addClass('completed');
    } else {
        taskElement.removeClass('completed');
    }

    updateTaskInStorage(listTitle, taskId, { completed: isCompleted });
    applyCurrentFilter();
});

// Handle filter button clicks
$('.filter__btn').on('click', function () {
    const filterBtn = $(this);
    $('.filter__btn').removeClass('filter__btn--active');
    filterBtn.addClass('filter__btn--active');
    applyCurrentFilter();
});

function applyCurrentFilter() {
    const activeFilter = $('.filter__btn--active').data('filter');
    $('.container__list-item').each(function () {
        const item = $(this);
        const isCompleted = item.hasClass('completed');

        switch (activeFilter) {
            case 'completed':
                item.toggleClass('hidden', !isCompleted);
                break;
            case 'active':
                item.toggleClass('hidden', isCompleted);
                break;
            default: // 'all'
                item.removeClass('hidden');
        }
    });
}
