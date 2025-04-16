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

class TodoApp {
    constructor() {
        this.listInput = $('.todo__input');
        this.listAddButton = $('.todo__button');
        this.setupEventListeners();
        this.loadSavedLists();
    }

    setupEventListeners() {
        $(document).on('click', '.form__submit', this.handleTaskCreation.bind(this));
        $(document).on('click', '.list-item__delete-btn', this.handleTaskDeletion.bind(this));
        $(document).on('click', '.container__delete-btn', this.handleListDeletion.bind(this));
        $(document).on('change', '.list-item__checkbox', this.handleTaskCompletion.bind(this));
        $('.filter__btn').on('click', this.handleFilterChange.bind(this));
        this.listAddButton.on('click', this.handleListCreation.bind(this));
    }

    loadSavedLists() {
        try {
            const savedLists = getListsFromStorage();
            savedLists.forEach(listData => {
                const listElement = renderList(listData.title);
                if (listElement) {
                    addListToDOM(listElement);
                    const container = $('.container').last();
                    listData.tasks.forEach(task => {
                        const taskElement = renderTask(task);
                        addTaskToDOM(taskElement, container);
                    });
                }
            });
        } catch (error) {
            console.error('Failed to load saved lists:', error);
            alert('Failed to load saved lists. Please try refreshing the page.');
        }
    }

    handleTaskCreation(event) {
        try {
            const container = $(event.target).closest('.container');
            const input = container.find('.form__input');
            const taskText = input.val().trim();
            const listTitle = container.find('.container__title').text();

            if (taskText) {
                const task = new Task(taskText);
                const taskElement = renderTask(task);
                addTaskToDOM(taskElement, container);
                addTaskToStorage(listTitle, task);
                input.val('');
            }
        } catch (error) {
            console.error('Failed to create task:', error);
            alert('Failed to create task. Please try again.');
        }
    }

    handleTaskDeletion(event) {
        try {
            const taskElement = $(event.target).closest('.container__list-item');
            const taskId = taskElement.data('id');
            const listTitle = taskElement.closest('.container').find('.container__title').text();

            if (confirm('Are you sure you want to delete this task?')) {
                removeTaskFromDOM(taskElement);
                removeTaskFromStorage(listTitle, taskId);
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
            alert('Failed to delete task. Please try again.');
        }
    }

    handleListCreation() {
        try {
            const listTitle = this.listInput.val().trim();
            if (listTitle) {
                const listElement = renderList(listTitle);
                if (listElement) {
                    addListToDOM(listElement);
                    const newList = new TaskList(listTitle);
                    addListToStorage(newList);
                    this.listInput.val('');
                }
            }
        } catch (error) {
            console.error('Failed to create list:', error);
            alert('Failed to create list. Please try again.');
        }
    }

    handleListDeletion(event) {
        try {
            const container = $(event.target).closest('.container');
            const listTitle = container.find('.container__title').text();

            if (confirm('Are you sure you want to delete this list and all its tasks?')) {
                container.remove();
                removeListFromStorage(listTitle);
            }
        } catch (error) {
            console.error('Failed to delete list:', error);
            alert('Failed to delete list. Please try again.');
        }
    }

    handleTaskCompletion(event) {
        try {
            const checkbox = $(event.target);
            const taskElement = checkbox.closest('.container__list-item');
            const taskId = taskElement.data('id');
            const listTitle = taskElement.closest('.container').find('.container__title').text();
            const isCompleted = checkbox.prop('checked');

            taskElement.toggleClass('completed', isCompleted);
            updateTaskInStorage(listTitle, taskId, { completed: isCompleted });
            this.applyCurrentFilter();
        } catch (error) {
            console.error('Failed to update task completion:', error);
            alert('Failed to update task. Please try again.');
        }
    }

    handleFilterChange(event) {
        try {
            const filterBtn = $(event.target);
            $('.filter__btn').removeClass('filter__btn--active');
            filterBtn.addClass('filter__btn--active');
            this.applyCurrentFilter();
        } catch (error) {
            console.error('Failed to apply filter:', error);
        }
    }

    applyCurrentFilter() {
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
}

// Initialize the app when the document is ready
$(document).ready(() => new TodoApp());
