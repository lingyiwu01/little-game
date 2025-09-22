const gameArea = document.getElementById('game-area');
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const treasureSound = document.getElementById('treasure-sound');

let currentLevel = 0;

const levels = [
  {
    title: "关卡1：迷宫入门",
    type: "chest",
    question: "5 + ? = 8",
    options: [2, 3, 4],
    answer: 3,
    assets: ['apple.png', 'chest.png']
  },
  {
    title: "关卡2：天平桥",
    type: "balance",
    question: ["3 🍏 + 6 🍊 = 5 🍌", "1 🍏 + 1 🍌 = 2 🍊"],
    options: ['🍏','🍊','🍌'],
    answer: [3,2,5], // 简单示意
    assets: ['apple.png','orange.png','banana.png','balance.png']
  },
  {
    title: "关卡3：海岛宝箱",
    type: "chest",
    question: "小鸡 + 小兔子 = 25，脚总数 70",
    options: [10, 15, 20, 5, 12],
    answer: [10,15], // 鸡10只，兔15只
    assets: ['chest.png','key.png']
  },
  {
    title: "关卡4：终极宝藏城堡",
    type: "castle",
    question: "(x+2)*2=12",
    options: [4,5,6],
    answer: 4,
    assets: ['castle.png']
  }
];

// 渲染关卡
function renderLevel() {
  gameArea.innerHTML = '';
  const level = levels[currentLevel];

  const title = document.createElement('h2');
  title.textContent = level.title;
  gameArea.appendChild(title);

  // 根据类型渲染
  if(level.type === 'chest') {
    const chestDiv = document.createElement('div');
    chestDiv.className = 'chest';
    const img = document.createElement('img');
    img.src = 'assets/chest.png';
    chestDiv.appendChild(img);

    const dropZone = document.createElement('div');
    dropZone.className = 'drop-zone';
    dropZone.textContent = '?';
    chestDiv.appendChild(dropZone);

    gameArea.appendChild(chestDiv);

    // 生成选项
    const numbersDiv = document.createElement('div');
    numbersDiv.textContent = '拖动正确数字到宝箱：';
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

  // 其他类型可扩展，比如 balance, castle
}

// 拖放逻辑
function addDragLogic(dropZone, chestDiv, answer){
  let draggedNumber = null;

  const numbers = document.querySelectorAll('.number');
  numbers.forEach(number=>{
    number.addEventListener('dragstart', e=>{
      draggedNumber=e.target;
    });
  });

  dropZone.addEventListener('dragover', e=>{ e.preventDefault(); });

  dropZone.addEventListener('drop', e=>{
    const value = draggedNumber.textContent;
    if(Array.isArray(answer)){
      if(answer.includes(Number(value))){
        dropZone.textContent=value;
        correctSound.play();
        openChest(chestDiv);
      } else {
        wrongSound.play();
        dropZone.classList.add('shake');
        setTimeout(()=>dropZone.classList.remove('shake'),300);
      }
    } else {
      if(Number(value)===answer){
        dropZone.textContent=value;
        correctSound.play();
        openChest(chestDiv);
      } else {
        wrongSound.play();
        dropZone.classList.add('shake');
        setTimeout(()=>dropZone.classList.remove('shake'),300);
      }
    }
  });
}

// 宝箱动画 + 苹果掉落
function openChest(chestDiv){
  chestDiv.classList.add('open');
  const flash = document.createElement('div');
  flash.className='flash';
  chestDiv.appendChild(flash);
  setTimeout(()=>chestDiv.removeChild(flash),500);

  // 苹果掉落
  for(let i=0;i<3;i++){
    const apple = document.createElement('img');
    apple.src='assets/apple.png';
    apple.className='apple-drop';
    apple.style.left=`${Math.random()*40}px`;
    chestDiv.appendChild(apple);
    setTimeout(()=>chestDiv.removeChild(apple),1000);
  }

  treasureSound.play();

  // 下一关
  setTimeout(()=>{
    currentLevel++;
    if(currentLevel<levels.length){
      renderLevel();
    } else {
      gameArea.innerHTML='<h2>恭喜！你找到了终极宝藏 🏆🎉</h2>';
    }
  },1500);
}

renderLevel();

