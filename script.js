const gameArea = document.getElementById('game-area');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const treasureSound = document.getElementById('treasure-sound');

let currentLevel = 0;

const levels = [
  { // 关卡1：迷宫入门
    type: 'chest',
    title: '关卡1：迷宫入门',
    left: ['red-circle','red-circle','red-circle','red-circle','red-circle'],
    right: ['red-circle','red-circle','red-circle','red-circle','red-circle','red-circle','red-circle','red-circle'],
    answer: 3,
    options: [2,3,4]
  },
  { // 关卡2：天平桥
    type: 'balance',
    title: '关卡2：天平桥',
    left: ['red-circle','red-circle','red-circle','orange-circle','orange-circle','orange-circle','orange-circle','orange-circle','orange-circle'],
    right: ['yellow-triangle','yellow-triangle','yellow-triangle','yellow-triangle','yellow-triangle'],
    answer: [3,2,5] // 示例答案
  },
  { // 关卡3：鸡兔同笼
    type: 'chest',
    title: '关卡3：海岛宝箱',
    left: ['yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken','yellow-triangle-chicken'],
    right: ['white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square','white-square'],
    answer: [10,15],
    options:[5,10,15,20]
  },
  { // 关卡4：终极宝藏城堡
    type: 'castle',
    title: '关卡4：终极宝藏城堡',
    question: '(x+2)*2=12',
    answer: 4,
    options:[3,4,5]
  }
];

// 渲染关卡
function renderLevel() {
  gameArea.innerHTML = '';
  const level = levels[currentLevel];

  const title = document.createElement('h2');
  title.textContent = level.title;
  gameArea.appendChild(title);

  if(level.type==='chest'){
    const chestDiv = document.createElement('div');
    chestDiv.className='chest';
    gameArea.appendChild(chestDiv);

    const dropZone = document.createElement('div');
    dropZone.className='drop-zone';
    dropZone.textContent='?';
    chestDiv.appendChild(dropZone);

    const numbersDiv = document.createElement('div');
    numbersDiv.textContent='拖动正确数字到宝箱：';
    level.options.forEach(opt=>{
      const num = document.createElement('div');
      num.className='number';
      num.draggable=true;
      num.textContent=opt;
      numbersDiv.appendChild(num);
    });
    gameArea.appendChild(numbersDiv);

    addDragLogic(dropZone, chestDiv, level.answer);
  }

  // balance 和 castle 可扩展类似逻辑
}

// 拖放逻辑
function addDragLogic(dropZone, chestDiv, answer){
  let draggedNumber = null;
  const numbers = document.querySelectorAll('.number');
  numbers.forEach(number=>{
    number.addEventListener('dragstart', e=>{ draggedNumber=e.target; });
  });

  dropZone.addEventListener('dragover', e=>e.preventDefault());
  dropZone.addEventListener('drop', e=>{
    const value = parseInt(draggedNumber.textContent);
    if(Array.isArray(answer)?answer.includes(value):value===answer){
      dropZone.textContent=value;
      correctSound.play();
      chestDiv.classList.add('open');
      const flash = document.createElement('div');
      flash.className='flash';
      chestDiv.appendChild(flash);
      setTimeout(()=>chestDiv.removeChild(flash),500);
      treasureSound.play();
      setTimeout(()=>{
        currentLevel++;
        if(currentLevel<levels.length) renderLevel();
        else gameArea.innerHTML='<h2>恭喜找到终极宝藏 🎉🏆</h2>';
      },1500);
    } else {
      wrongSound.play();
      dropZone.classList.add('shake');
      setTimeout(()=>dropZone.classList.remove('shake'),300);
    }
  });
}

renderLevel();

