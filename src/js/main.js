import { renderTask, addTaskToDOM, removeTaskFromDOM, renderList, addListToDOM } from './ui.js';
import Task from './model.js';

const listInput = $('.todo__input');
const listAddButton = $('.todo__button');

// Event delegation for handling task creation in specific lists
$(document).on('click', '.form__submit', function (event) {
    const container = $(event.target).closest('.container');
    const input = container.find('.form__input');
    const task = new Task(input.val());

    if (task.text) {
        const taskElement = renderTask(task);
        addTaskToDOM(taskElement, container);
        input.val('');
    }
    else {
        alert('Error: Empty task!');
    }
});

// Event delegation for handling task deletion
$(document).on('click', '.list-item__delete-btn', function (event) {
    const taskElement = $(event.target).closest('.container__list-item');
    removeTaskFromDOM(taskElement);
});

// Handle list creation
listAddButton.on('click', function (event) {
    const listTitle = listInput.val();
    if (listTitle) {
        const listElement = renderList(listTitle);
        addListToDOM(listElement);
        listInput.val('');
    }
    else {
        alert('Error: Empty list title!');
    }
});

// Handle list deletion
$(document).on('click', '.container__delete-btn', function (event) {
    const container = $(event.target).closest('.container');
    container.remove();
});

// Handle task completion toggling
$(document).on('change', '.list-item__checkbox', function (event) {
    const checkbox = $(event.target);
    const taskElement = checkbox.closest('.container__list-item');

    if (checkbox.prop('checked')) {
        taskElement.addClass('completed');
    } else {
        taskElement.removeClass('completed');
    }

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
