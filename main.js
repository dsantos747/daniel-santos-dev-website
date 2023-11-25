const mouseThrottle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

const throttledMouseMove = mouseThrottle((e) => {
  const boxRect = box.getBoundingClientRect();
  const mouseX = e.clientX - boxRect.left;
  const mouseY = e.clientY - boxRect.top;

  bubbles.forEach((bubble, index) => {
    const bubbleX = bubble.offsetLeft + bubble.clientWidth / 2;
    const bubbleY = bubble.offsetTop + bubble.clientHeight / 2;

    const deltaX = mouseX - bubbleX;
    const deltaY = mouseY - bubbleY;

    const delta = Math.sqrt(deltaX ** 2 + deltaY ** 2);

    if (delta < 120) {
      const offsetX = (deltaX / delta) * -10;
      const offsetY = (deltaY / delta) * -10;

      bubble.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      bubble.style.boxShadow = `${offsetX / 5}px ${offsetY / 5}px 1px #00746144`;
    } else {
      bubble.style.transform = 'translate(0, 0)';
      bubble.style.boxShadow = `0 0 5px #00746144`;
    }
  });
}, 16);

function isValidKey(key) {
  const validKeyPattern = /^[a-zA-Z0-9!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]$/;
  return validKeyPattern.test(key);
}

const bubbles = document.querySelectorAll('.welcome-stack-bubble');
const box = document.querySelector('.welcome-stack-cloud');

// const cursor = document.getElementById('cursor');
const typedLetter = document.getElementById('typed-letter');
let lastKeyPressTime = 0;

document.addEventListener('mousemove', throttledMouseMove);

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
    // const pressedKey = e.key;
  }
});
