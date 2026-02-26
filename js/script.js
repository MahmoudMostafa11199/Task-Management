// Elements
const formTasks = document.querySelector('.form__add-task');
const taskInput = document.querySelector('.task-input');
const tasksContainer = document.querySelector('.task-container');
const taskCountLabel = document.querySelector('.count--task');
const membersCardsContainer = document.querySelector(
  '.members__cards-container',
);

// State
const members = JSON.parse(localStorage.getItem('teamMember')) || [];
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//
const displayTask = (task, id) => {
  const taskMarkup = `
    <div class="task" data-id="${id + 1}" draggable="true">
      <p class="task__text">${task}</p>
      <span class="task__delete btn">X</span>
    </div>
    `;

  tasksContainer.insertAdjacentHTML('beforeend', taskMarkup);
};
//
const displayMember = (member) => {
  const memberMarkup = `
      <div class="tasks card__item">
        <h3 class="heading__tertiary">
          <span class="title">👤 ${member}</span>
          <span class="count count--task-member">0</span>
        </h3>
        <div class="member-tasks" data-member="${member}">
          </div>
      </div>
    `;

  membersCardsContainer.insertAdjacentHTML('beforeend', memberMarkup);
};

if (members.length) {
  //----------------------------------------
  //* Show tasks
  tasks.map((ts, i) => displayTask(ts, i));
  taskCountLabel.textContent = tasks.length;

  //----------------------------------------
  //* Show member
  members.forEach(displayMember);

  //----------------------------------------
  //* Add task
  formTasks.addEventListener('submit', (e) => {
    e.preventDefault();

    const task = taskInput.value.trim();

    if (!task) {
      showNotification('error', 'Task title is required');
      return;
    }

    displayTask(task, tasks.length);
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    taskCountLabel.textContent = tasks.length;
    formTasks.reset();
  });

  //----------------------------------------
  //* Drag and Drop
  //* Drag
  tasksContainer.addEventListener('dragstart', (e) => {
    const taskEl = e.target.closest('.task');

    if (taskEl) {
      e.dataTransfer.setData('taskId', taskEl.dataset.id);
      taskEl.style.opacity = '0.5';
    }
  });
  tasksContainer.addEventListener('dragend', (e) => {
    const taskEl = e.target.closest('.task');
    if (taskEl) {
      taskEl.style.opacity = '1';
    }
  });

  //* Drop
  membersCardsContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
    const targetMember = e.target.closest('.member-tasks');
    if (targetMember) {
      targetMember.style.backgroundColor = '#f0f0f0';
      targetMember.style.border = '1px dashed #7271ff';
      targetMember.style.borderRadius = '6px';
    }
  });
  membersCardsContainer.addEventListener('dragleave', (e) => {
    const targetMember = e.target.closest('.member-tasks');
    if (targetMember) {
      targetMember.style.backgroundColor = '';
      targetMember.style.border = '0';
    }
  });
  membersCardsContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    const targetMember = e.target.closest('.member-tasks');
    const taskId = e.dataTransfer.getData('taskId');

    const taskEl = document.querySelector(`[data-id="${taskId}"]`);

    if (targetMember && taskEl) {
      targetMember.style.backgroundColor = '';
      targetMember.style.border = '0';
      taskEl.style.opacity = '1';

      targetMember.appendChild(taskEl);
    }
  });
}
