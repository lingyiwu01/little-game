const gameArea = document.getElementById('game-area');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const treasureSound = document.getElementById('treasure-sound');

let currentLevel = 0;

const levels = [
  { // 关卡1：迷宫入门
    type: 'chest',
    title: '关卡1：迷宫入门',
    left: '🍎 🍎 🍎 🍎 🍎',
    right: '🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎',
    answer: 3,
    options: [2,3,4]
  },
  { // 关卡2：天平桥
    type: 'balance',
    title: '关卡2：天平桥',
    fruits: ['🍏','🍊','🍌'],
    answer: [3,2,5] // 示例答案
  },
  { // 关卡3：海岛宝箱
    type: 'chest',
    title: '关卡3：海岛宝箱',
    question: '小鸡+小兔=25，脚70',
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

  // 其他类型 balance, castle 可扩展
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
