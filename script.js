const numbers = document.querySelectorAll('.number');
const dropZone = document.getElementById('drop-zone');
const chest = document.getElementById('chest');
const successSound = document.getElementById('success-sound');

numbers.forEach(num => {
  num.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text', e.target.textContent);
  });
});

dropZone.addEventListener('dragover', e => e.preventDefault());

dropZone.addEventListener('drop', e => {
  e.preventDefault();
  const value = e.dataTransfer.getData('text');
  if (value === '3') {
    dropZone.textContent = `✔ 正确！宝箱打开了 🎁`;
    successSound.play();
    chest.textContent = '🪙'; // 打开宝箱动画效果，可以直接换 emoji
  } else {
    dropZone.textContent = `❌ 错误，试试别的数字`;
  }
});
