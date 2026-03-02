//----------------------------------------
// Elements
const formTasks = document.querySelector('.form__add-task');
const taskInput = document.querySelector('.task-input');
const tasksContainer = document.querySelector('.task-container');
const taskCountLabel = document.querySelector('.count--task');
const membersCardsContainer = document.querySelector(
  '.members__cards-container',
);
const deleteModal = document.querySelector('.delete-task');

//----------------------------------------
// State
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

//----------------------------------------
// Render all tasks
const renderTasks = () => {
  tasksContainer.innerHTML = '';
  document
    .querySelectorAll('.member-tasks')
    .forEach((el) => (el.innerHTML = ''));

  tasks.forEach((task) => {
    const isMainBoard = task.owner === 'board';

    const markup = `
      <div class="task ${task.status}" data-id="${task.id}" draggable="true">
          <div class="task__text-box">
            <p class="task__text">${task.text}</p>
            <span class="task__delete btn" onclick="deleteTask(${task.id})">X</span>
          </div>
          ${
            !isMainBoard
              ? `
              <select class="task__status" onchange="updateTaskStatus(${task.id}, this.value)" name="task-status">
                  <option value="Not-Started" ${task.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                  <option value="Ongoing" ${task.status === 'Ongoing' ? 'selected' : ''}>Ongoing</option>
                  <option value="Finished" ${task.status === 'Finished' ? 'selected' : ''}>Finished</option>
              </select>
          `
              : ''
          }
      </div>`;

    if (isMainBoard) {
      tasksContainer.insertAdjacentHTML('beforeend', markup);
    } else {
      const memberDiv = document.querySelector(
        `.member-tasks[data-member="${task.owner}"]`,
      );
      if (memberDiv) memberDiv.insertAdjacentHTML('beforeend', markup);
    }
  });

  checkEmptyContainers();
  updateAllCount();
};

// Check empty tasks container
const checkEmptyContainers = () => {
  document.querySelectorAll('.member-tasks').forEach((el) => {
    if (el.children.length === 0) {
      el.innerHTML = '<p class="no-tasks">No tasks assigned</p>';
    }
  });
  document.querySelectorAll('.task-container').forEach((el) => {
    if (el.children.length === 0) {
      el.innerHTML = '<p class="no-tasks">No tasks yet. Add tasks here!</p>';
    }
  });
};

// Display member
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

//----------------------------------------
//* Add new task
formTasks.addEventListener('submit', (e) => {
  e.preventDefault();

  const taskText = taskInput.value.trim();

  if (!taskText) {
    showNotification('error', 'Task title is required');
    return;
  }

  const newTask = {
    id: Date.now(),
    text: taskText,
    owner: 'board',
    status: 'Not-Started',
  };

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  showNotification('success', 'Task added successfully');
  formTasks.reset();
});

//----------------------------------------
// Update Counts
const updateAllCount = () => {
  taskCountLabel.textContent = tasks.filter((t) => t.owner === 'board').length;

  document.querySelectorAll('.card__item').forEach((card) => {
    const memberTasks = card.querySelector('.member-tasks');
    if (memberTasks) {
      const memberName = memberTasks.dataset.member;
      const countLabel = card.querySelector('.count--task-member');
      countLabel.textContent = tasks.filter(
        (t) => t.owner === memberName,
      ).length;
    }
  });
};

//----------------------------------------
// Update task status (Not-Started, Ongoing, Finished)
const updateTaskStatus = (id, newStatus) => {
  const task = tasks.find((t) => t.id == id);
  if (task) {
    task.status = newStatus;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    const selectedTask = document.querySelector(`[data-id="${id}"]`);
    selectedTask.setAttribute('class', `task ${newStatus}`);
  }
};

//----------------------------------------
// Delete Task by Id
const deleteTask = (id) => {
  openDeleteModal(id);
};

//----------------------------------------
//* Drag and Drop
//* Drag
document.addEventListener('dragstart', (e) => {
  const taskEl = e.target.closest('.task');

  if (taskEl) {
    if (taskEl.classList.contains('Finished')) {
      e.preventDefault();
      showNotification('warning', 'Finished tasks cannot be moved!');
    } else {
      e.dataTransfer.setData('taskId', taskEl.dataset.id);
      taskEl.style.opacity = '0.5';
    }
  }
});
document.addEventListener('dragend', (e) => {
  if (e.target.closest('.task')) taskEl.style.opacity = '1';
});

//* Drop
// Handle Drop
const handleDrop = (e) => {
  e.preventDefault();

  const targetContainer =
    e.target.closest('.member-tasks') || e.target.closest('.task-container');
  const taskId = e.dataTransfer.getData('taskId');

  if (targetContainer && taskId) {
    const newOwner = targetContainer.dataset.member || 'board';
    const taskIndex = tasks.findIndex((t) => t.id == taskId);

    if (taskIndex !== -1) {
      tasks[taskIndex].owner = newOwner;

      if (newOwner === 'board') tasks[taskIndex].status = 'Not-Started';

      localStorage.setItem('tasks', JSON.stringify(tasks));

      renderTasks();
    }

    targetContainer.style.backgroundColor = '';
    targetContainer.style.border = '0';
  }
};

// Handle Drag Over
const handleDragOver = (e) => {
  e.preventDefault();

  const targetContainer =
    e.target.closest('.member-tasks') || e.target.closest('.task-container');
  if (targetContainer) {
    targetContainer.style.backgroundColor = '#f0f0f0';
    targetContainer.style.border = '2px dashed #7271ff';
  }
};

// Handle Drag Leave
const handleDragLeave = (e) => {
  const targetContainer =
    e.target.closest('.member-tasks') || e.target.closest('.task-container');
  if (targetContainer) {
    targetContainer.style.backgroundColor = '';
    targetContainer.style.border = '0';
  }
};

// Bind Event Listener
// ==> Board
tasksContainer.addEventListener('dragover', handleDragOver);
tasksContainer.addEventListener('dragleave', handleDragLeave);
tasksContainer.addEventListener('drop', handleDrop);

// ==> Members
membersCardsContainer.addEventListener('dragover', handleDragOver);
membersCardsContainer.addEventListener('dragleave', handleDragLeave);
membersCardsContainer.addEventListener('drop', handleDrop);

//-----------------------------------------
// Initialization
const initApp = () => {
  const members = JSON.parse(localStorage.getItem('teamMember')) || [];
  membersCardsContainer.innerHTML = '';

  if (members.length > 0) {
    document.querySelector('.card').classList.add('show');
    //----------------------------------------
    //* Show member
    members.forEach(displayMember);

    //----------------------------------------
    //* Show tasks
    renderTasks();
  } else {
    document.querySelector('.card').classList.remove('show');
  }
};
initApp();
