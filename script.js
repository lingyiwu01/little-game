const gameContainer = document.getElementById('game-container');

let currentLevel = 1;

function startLevel(level) {
  gameContainer.innerHTML = '';
  if(level === 1){
    level1();
  } else if(level === 2){
    level2();
  } else if(level === 3){
    level3();
  } else if(level === 4){
    level4();
  }
}

function level1(){
  gameContainer.innerHTML = `
    <h2>关卡 1：迷宫入门</h2>
    <p>拖动正确数字到宝箱，解开谜题：</p>
    <p>简单题：x + 3 = 7</p>
    <div id="options">
      <div class="draggable" draggable="true">4</div>
      <div class="draggable" draggable="true">3</div>
      <div class="draggable" draggable="true">5</div>
    </div>
    <div id="dropzone" class="droppable">🎁</div>
  `;
  addDragDrop('4', ()=>nextLevel());
}

function level2(){
  gameContainer.innerHTML = `
    <h2>关卡 2：天平桥</h2>
    <p>拖动水果到天平平衡：</p>
    <p>式子1：左 3 🍏 + 6 🍊 = 右 5 🍌</p>
    <p>式子2：左 1 🍏 + 1 🍌 = 右 2 🍊</p>
    <p>求 🍏 : 🍊 : 🍌</p>
    <div id="options">
      <div class="draggable" draggable="true">🍏</div>
      <div class="draggable" draggable="true">🍊</div>
      <div class="draggable" draggable="true">🍌</div>
    </div>
    <div id="dropzone" class="droppable">⚖️</div>
  `;
  addDragDrop('🍏', ()=>nextLevel());
}

function level3(){
  gameContainer.innerHTML = `
    <h2>关卡 3：海岛宝箱</h2>
    <p>鸡兔同笼问题：</p>
    <p>小笼子里共有 25 只小动物，其中有小鸡和小兔子。共有 70 只脚。</p>
    <p>拖动钥匙数字到宝箱：</p>
    <div id="options">
      <div class="draggable" draggable="true">15</div>
      <div class="draggable" draggable="true">10</div>
      <div class="draggable" draggable="true">12</div>
    </div>
    <div id="dropzone" class="droppable">🎁</div>
  `;
  addDragDrop('15', ()=>nextLevel());
}

function level4(){
  gameContainer.innerHTML = `
    <h2>关卡 4：终极宝藏城堡</h2>
    <p>题目：(x + 2) * 2 = 12</p>
    <p>拖动正确数字到宝箱，开启宝藏动画：</p>
    <div id="options">
      <div class="draggable" draggable="true">4</div>
      <div class="draggable" draggable="true">5</div>
      <div class="draggable" draggable="true">6</div>
    </div>
    <div id="dropzone" class="droppable">🏰</div>
    <div id="treasure"></div>
  `;
  addDragDrop('4', showTreasure);
}

function addDragDrop(correct, callback){
  const draggables = document.querySelectorAll('.draggable');
  const dropzone = document.getElementById('dropzone');

  draggables.forEach(d => {
    d.addEventListener('dragstart', e=>{
      e.dataTransfer.setData('text', d.textContent);
    });
  });

  dropzone.addEventListener('dragover', e=>{
    e.preventDefault();
  });

  dropzone.addEventListener('drop', e=>{
    e.preventDefault();
    const data = e.dataTransfer.getData('text');
    if(data === correct){
      alert('答对啦！');
      callback();
    } else {
      alert('答错啦，再试一次！');
    }
  });
}

function nextLevel(){
  currentLevel++;
  startLevel(currentLevel);
}

function showTreasure(){
  const treasure = document.getElementById('treasure');
  treasure.textContent = '💎🎉 宝藏开启啦！ 🎉💎';
}

startLevel(currentLevel);
