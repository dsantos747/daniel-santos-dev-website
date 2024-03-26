/**
 * Burger menu functionality
 */
function closeMenu(event) {
  const burger = document.getElementById('menuCheckbox');
  if (!event.target.closest('#menu') && !event.target.closest('#menuToggle')) {
    burger.checked = false;
  }
}
document.addEventListener('click', closeMenu);

/**
 * KeyPress Animation
 */
function isValidKey(key) {
  const validKeyPattern = /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]$/;
  return validKeyPattern.test(key);
}

const typedLetter = document.getElementById('typed-letter');
let lastKeyPressTime = 0;

document.addEventListener('keydown', (e) => {
  const currentTime = new Date().getTime();

  if (currentTime - lastKeyPressTime > 100) {
    if (isValidKey(e.key)) {
      typedLetter.textContent = e.key.toUpperCase();
      typedLetter.style.opacity = 1;

      setTimeout(() => {
        typedLetter.style.opacity = 0;
      }, 500);

      lastKeyPressTime = currentTime;
    }
  }
});

/**
 * Modal Malarkey
 */
const modalButtons = document.querySelectorAll('.btn-openModal');
modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.modal);
    modal.showModal();
  });
});

const closeButtons = document.querySelectorAll('.btn-closeModal');
closeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modal = document.getElementById(button.dataset.modal);
    modal.close();
  });
});

// Close on outside click
document.addEventListener('click', (event) => {
  if (event.target.classList.contains('modal')) {
    const openModals = document.querySelectorAll('.modal[open]');
    if (openModals.length > 0) {
      openModals[openModals.length - 1].close();
    }
  }
});

// Close on escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const openModals = document.querySelectorAll('.modal[open]');
    if (openModals.length > 0) {
      openModals[openModals.length - 1].close();
    }
  }
});
