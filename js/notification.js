// Elements
const notification = document.querySelector('.notification');
const closeNotificationBtn = document.querySelector('.close-notification');

// State
let notificationTimer;

//
const showNotification = (status, message) => {
  clearTimeout(notificationTimer);

  let markup;
  switch (status) {
    case 'error':
      markup = `
        <span class="close-notification">X</span>
        ${message}
      `;
      notification.classList.add('error');
      break;

    case 'success':
      markup = `
        <span>✅</span>
        ${message}
        `;
      notification.classList.add('success');
      break;
  }

  notification.innerHTML = markup;
  notification.classList.remove('notification-hidden');

  startTimeout();
};

const closeNotification = () => {
  notification.classList.add('notification-hidden');

  clearTimeout(notificationTimer);
};

const startTimeout = () => {
  clearTimeout(notificationTimer);

  notificationTimer = setTimeout(() => {
    notification.classList.add('notification-hidden');
  }, 3000);
};

//

notification.addEventListener('mouseover', (e) => {
  clearTimeout(notificationTimer);
});
notification.addEventListener('mouseleave', startTimeout);

closeNotificationBtn?.addEventListener('click', closeNotification);
