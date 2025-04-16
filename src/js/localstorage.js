const STORAGE_KEY = 'todoLists';

function saveListsToStorage(lists) {
    try {
        if (!Array.isArray(lists)) {
            throw new Error('Lists must be an array');
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch (error) {
        console.error('Failed to save lists:', error);
        throw error;
    }
}

function getListsFromStorage() {
    try {
        const lists = localStorage.getItem(STORAGE_KEY);
        return lists ? JSON.parse(lists) : [];
    } catch (error) {
        console.error('Failed to get lists:', error);
        return [];
    }
}

function findList(lists, listTitle) {
    if (!listTitle) throw new Error('List title is required');
    return lists.find(l => l.title === listTitle);
}

function updateTaskInStorage(listTitle, taskId, updates) {
    try {
        if (!taskId || !updates) throw new Error('Task ID and updates are required');
        const lists = getListsFromStorage();
        const list = findList(lists, listTitle);

        if (list) {
            const task = list.tasks.find(t => t.id === taskId);
            if (task) {
                Object.assign(task, updates);
                saveListsToStorage(lists);
            }
        }
    } catch (error) {
        console.error('Failed to update task:', error);
        throw error;
    }
}

function addTaskToStorage(listTitle, task) {
    try {
        if (!task) throw new Error('Task is required');
        const lists = getListsFromStorage();
        const list = findList(lists, listTitle);

        if (list) {
            list.tasks.push(task);
            saveListsToStorage(lists);
        }
    } catch (error) {
        console.error('Failed to add task:', error);
        throw error;
    }
}

function removeTaskFromStorage(listTitle, taskId) {
    try {
        if (!taskId) throw new Error('Task ID is required');
        const lists = getListsFromStorage();
        const list = findList(lists, listTitle);

        if (list) {
            list.tasks = list.tasks.filter(t => t.id !== taskId);
            saveListsToStorage(lists);
        }
    } catch (error) {
        console.error('Failed to remove task:', error);
        throw error;
    }
}

function addListToStorage(list) {
    try {
        if (!list || !list.title) throw new Error('Valid list object is required');
        const lists = getListsFromStorage();
        if (lists.some(l => l.title === list.title)) {
            throw new Error('List with this title already exists');
        }
        lists.push(list);
        saveListsToStorage(lists);
    } catch (error) {
        console.error('Failed to add list:', error);
        throw error;
    }
}

function removeListFromStorage(title) {
    try {
        if (!title) throw new Error('List title is required');
        const lists = getListsFromStorage();
        const updatedLists = lists.filter(l => l.title !== title);
        saveListsToStorage(updatedLists);
    } catch (error) {
        console.error('Failed to remove list:', error);
        throw error;
    }
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