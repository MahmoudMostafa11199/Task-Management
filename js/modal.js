//-------------------------------------------------
// Elements
const modalTeam = document.querySelector('.modal-team');
const modalDelete = document.querySelector('.delete-task');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.close-modal');
const btnConfirmDelete = document.querySelector('.btn--confirm-delete');
const btnCancelDelete = document.querySelector('.btn--cancel');

const formSumbit = document.querySelector('.form-team');
const teamMembersInput = document.querySelector('#team-member');

//-------------------------------------------------
// State
let taskToDeleteId = null;

//-------------------------------------------------
// Open modal (create team)
const openTeamModal = function () {
  modalTeam.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Open modal (delete task)
const openDeleteModal = function (id) {
  taskToDeleteId = id;
  modalDelete.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Close any modal
const closeModal = function () {
  modalTeam.classList.add('hidden');
  modalDelete.classList.add('hidden');
  overlay.classList.add('hidden');
  taskToDeleteId = null;
};

//-------------------------------------------------
// Event Listener
// Create Team member
formSumbit.addEventListener('submit', (e) => {
  e.preventDefault();

  let teamMember = teamMembersInput.value.trim();

  if (!teamMember) {
    showNotification('error', 'Please enter at least one team member name!');

    return;
  }

  const members = teamMember.split(',').map((t) => t.trim());

  localStorage.setItem('teamMember', JSON.stringify(members));

  closeModal();
  initApp();

  showNotification('success', 'Welcome to Task Management!');
});

// Confirm delete task
btnConfirmDelete.addEventListener('click', () => {
  if (taskToDeleteId) {
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasksFromStorage.filter((t) => t.id != taskToDeleteId);

    tasks.splice(0, tasks.length, ...updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    closeModal();
    renderTasks();

    showNotification('success', 'Task deleted successfully');
  }
});

// Close modal on Cancel button
btnCancelDelete.addEventListener('click', closeModal);

//-------------------------------------------------
// Initalization
const init = () => {
  openTeamModal();

  if (localStorage.getItem('teamMember')) closeModal();
};
init();
