const STORAGE_KEY = 'todoLists';

function saveListsToStorage(lists) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
}

function getListsFromStorage() {
    const lists = localStorage.getItem(STORAGE_KEY);
    return lists ? JSON.parse(lists) : [];
}

function updateTaskInStorage(listTitle, taskId, updates) {
    const lists = getListsFromStorage();
    const list = lists.find(l => l.title === listTitle);
    if (list) {
        const task = list.tasks.find(t => t.id === taskId);
        if (task) {
            Object.assign(task, updates);
            saveListsToStorage(lists);
        }
    }
}

function addTaskToStorage(listTitle, task) {
    const lists = getListsFromStorage();
    const list = lists.find(l => l.title === listTitle);
    if (list) {
        list.tasks.push(task);
        saveListsToStorage(lists);
    }
}

function removeTaskFromStorage(listTitle, taskId) {
    const lists = getListsFromStorage();
    const list = lists.find(l => l.title === listTitle);
    if (list) {
        list.tasks = list.tasks.filter(t => t.id !== taskId);
        saveListsToStorage(lists);
    }
}

function addListToStorage(list) {
    const lists = getListsFromStorage();
    lists.push(list);
    saveListsToStorage(lists);
}

function removeListFromStorage(title) {
    const lists = getListsFromStorage();
    const updatedLists = lists.filter(l => l.title !== title);
    saveListsToStorage(updatedLists);
}

export {
    saveListsToStorage,
    getListsFromStorage,
    updateTaskInStorage,
    addTaskToStorage,
    removeTaskFromStorage,
    addListToStorage,
    removeListFromStorage
};