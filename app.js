let taskCount = 0;
let currentTask;

window.onload = function () {
    taskEditorButtonsAddFunctions();
    document.addEventListener('closeTaskEditor', closeTaskEditor);
    document.addEventListener('openTaskEditor', openTaskEditor);
    let addButton = document.querySelector('.addButton');
    addButton.addEventListener('click', addTask);
}

function addTask(event) {
    taskCount++;
    let task = makeATask(taskCount);
    document.querySelector('.listItems').append(task);
    let open = new CustomEvent('openTaskEditor', { detail: { currentTask: task } });
    document.dispatchEvent(open);
}

function taskEditorButtonsAddFunctions() {
    let taskEditorWindow = document.querySelector('.taskEditor');
    let taskEditorPriorityButton = taskEditorWindow.querySelector('.highPriorityButton');
    let saveButton = taskEditorWindow.querySelector('.saveButton');
    let closeButton = taskEditorWindow.querySelector('.closeButton');

    taskEditorPriorityButton.addEventListener('click', taskEditorPriorityButtonFunction);
    saveButton.addEventListener('click', saveButtonFunction);
    closeButton.addEventListener('click', closeButtonFunction);
}

function taskEditorPriorityButtonFunction() {
    let checkBox = event.target.closest('.taskEditor').querySelector('.checkBox');
    checkBox.classList.toggle('checked');
}

function saveButtonFunction(event) {
    let inputString = event.target.closest('.taskEditor').querySelector('input');
    let currentTaskPriority = currentTask.querySelector('.highPriority');
    let currentTaskValue = currentTask.querySelector('.taskValue');

    currentTaskValue.innerText = inputString.value;

    let taskEditorCheckBox = event.target.closest('.taskEditor').querySelector('.checkBox');

    if(taskEditorCheckBox.classList.contains('checked'))
    {
        currentTaskPriority.classList.remove('hidden');
    } else currentTaskPriority.classList.add('hidden');

    let close = new CustomEvent('closeTaskEditor');
    document.dispatchEvent(close);
}

function closeButtonFunction(event) {
    let close = new CustomEvent('closeTaskEditor');
    document.dispatchEvent(close);
}

function openTaskEditor(event) {
    currentTask = event.detail.currentTask;
    let currentTaskPriority = currentTask.querySelector('.highPriority');
    let currentTaskValue = currentTask.querySelector('.taskValue');

    let taskEditorWindow = document.querySelector('.taskEditor');
    taskEditorWindow.classList.remove('hidden');

    let taskEditorString = taskEditorWindow.querySelector('input');
    taskEditorString.value = currentTaskValue.innerText;

    let taskEditorCheckBox = taskEditorWindow.querySelector('.checkBox');
    if(currentTaskPriority.classList.contains('hidden'))
    {
        taskEditorCheckBox.classList.remove('checked');
    } else taskEditorCheckBox.classList.add('checked');
}

function closeTaskEditor(event) {
    let taskEditorWindow = document.querySelector('.taskEditor');
    taskEditorWindow.classList.add('hidden');
}

function makeATask(taskCount) {
    let task = document.createElement('div');
    task.classList.add('task');

    //---------------------------------------------
    let taskStatus = document.createElement('div');
    taskStatus.classList.add('taskStatus');
    let checkBox = document.createElement('div');
    checkBox.classList.add('checkBox');
    checkBox.addEventListener('click', switchCompleteStatus);
    taskStatus.append(checkBox);
    let highPriority = document.createElement('div');
    highPriority.classList.add('highPriority');
    highPriority.classList.add('hidden');
    taskStatus.append(highPriority);
    task.append(taskStatus);
    //---------------------------------------------

    //---------------------------------------------
    let taskValue = document.createElement('div');
    taskValue.classList.add('taskValue');
    taskValue.innerText = "Задача " + taskCount;
    task.append(taskValue);
    //---------------------------------------------

    //---------------------------------------------
    let taskButtons = document.createElement('div');
    taskButtons.classList.add('taskButtons');

    let editTaskButton = document.createElement('div');
    editTaskButton.classList.add('editTaskButton');
    editTaskButton.addEventListener('click', editTask);
    taskButtons.append(editTaskButton);

    let deleteTaskButton = document.createElement('div');
    deleteTaskButton.classList.add('deleteTaskButton');
    deleteTaskButton.addEventListener('click', deleteTask);
    taskButtons.append(deleteTaskButton);

    task.append(taskButtons);
    //---------------------------------------------

    return task;
}

function switchCompleteStatus(event)
{
    let task = event.target.closest('.task');
    this.classList.toggle('checked');
    task.classList.toggle('complitedTask');
}

function editTask(event) {
    let task = event.target.closest('.task');
    let open = new CustomEvent('openTaskEditor', { detail: { currentTask: task } });
    document.dispatchEvent(open);
}

function deleteTask(event) {
    let close = new CustomEvent('closeTaskEditor');
    document.dispatchEvent(close);
    event.target.closest('.task').remove();
}