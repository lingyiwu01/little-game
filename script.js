const numbers = document.querySelectorAll('.number');
const dropZone = document.querySelector('.drop-zone');
const correctSound = document.getElementById('correct-sound');
const openChestSound = document.getElementById('open-chest-sound');

let draggedNumber = null;

numbers.forEach(number => {
  number.addEventListener('dragstart', e => {
    draggedNumber = e.target;
  });
});

dropZone.addEventListener('dragover', e => {
  e.preventDefault();
});

dropZone.addEventListener('drop', e => {
  const value = parseInt(draggedNumber.textContent);
  if (value === 3) { // 正确答案
    dropZone.textContent = value;
    correctSound.play();
    setTimeout(() => {
      openChestSound.play();
      alert('答对了！宝箱里有 3 个苹果 🍎🎉');
    }, 500);
  } else {
    alert('不对哦，再试试！');
  }
});

