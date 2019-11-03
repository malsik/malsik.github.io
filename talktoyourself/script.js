const phone = document.querySelector('.phone');
const boundingBox = phone.getBoundingClientRect();
const centerX = boundingBox.left + boundingBox.width / 2;
const centerY = boundingBox.top + boundingBox.height / 2;

window.addEventListener('mousemove', (e) => {
  const { pageX, pageY } = e;
  const [diffX, diffY] = [centerX - pageX, centerY - pageY];
  phone.style.transform = `translateZ(-40px) rotateX(${diffY / 20}deg) rotateY(${-diffX / 20}deg)`;
});

const form = phone.querySelector('.phone__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { value } = form.querySelector('input');
  if (value) {
    const chat = phone.querySelector('.phone__chat');
    const message = document.createElement('p');
    message.classList.add('chat--message');
    message.textContent = value;
    chat.appendChild(message);
  }
  form.reset();
});