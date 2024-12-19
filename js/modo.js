const botonLight = document.getElementById('light');
const botonDark = document.getElementById('dark');
const body = document.body;

// Modo Light
botonLight.addEventListener('click', () => {
  body.style.backgroundColor = 'white';
  body.style.color = 'black';
});

// Modo Dark
botonDark.addEventListener('click', () => {
  body.style.backgroundColor = 'black';
  body.style.color = 'blue';
});