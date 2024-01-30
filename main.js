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
const dialog = document.getElementById('video-modal');
const showButton = document.getElementById('btn-openModal');
const closeButton = document.getElementById('btn-closeModal');

showButton.addEventListener('click', () => {
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('click', () => dialog.close());

const video = document.getElementById('video');
video.addEventListener('click', (event) => event.stopPropagation());
