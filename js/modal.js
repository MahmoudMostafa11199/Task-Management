// Elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

const formSumbit = document.querySelector('.form-team');
const teamMembersInput = document.querySelector('#team-member');

//
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//
formSumbit.addEventListener('submit', (e) => {
  e.preventDefault();

  let teamMember = teamMembersInput.value.trim();

  if (!teamMember) {
    showNotification('error', 'Please enter at least one team member name!');

    return;
  }

  closeNotification();

  const members = teamMember.split(',').map((t) => t.trim());

  localStorage.setItem('teamMember', JSON.stringify(members));

  closeModal();
  showNotification('success', 'Welcome to Task Management!');
});

//

//
(() => {
  openModal();

  if (localStorage.getItem('teamMember')) closeModal();
})();
