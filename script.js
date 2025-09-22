const numbers = document.querySelectorAll('.number');
const chest = document.querySelector('.chest');
const correctSound = document.getElementById('correct-sound');
const openChestSound = document.getElementById('open-chest-sound');

numbers.forEach(number => {
  number.addEventListener('dragstart', dragStart);
});

chest.addEventListener('dragover', dragOver);
chest.addEventListener('drop', drop);

let draggedNumber = null;

function dragStart(e) {
  draggedNumber = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function drop(e) {
  const value = parseInt(draggedNumber.textContent);
  if(value === 3) { // 正确答案
    correctSound.play();
    chest.style.transform = 'scale(1.2) rotate(15deg)';
    setTimeout(() => {
      chest.style.transform = 'scale(1) rotate(0deg)';
      openChestSound.play();
      alert('答对了！宝箱打开啦！🎉');
    }, 500);
  } else {
    alert('不对哦，再试试！');
  }
}

