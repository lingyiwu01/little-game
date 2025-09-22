const gameContainer = document.getElementById("game-container");
const nextBtn = document.getElementById("next-btn");

let currentLevel = 0;

const levels = [
  {
    title: "关卡1：迷宫入门",
    description: "5🍎 + 宝箱 = 8🍎，拖动正确数字开宝箱",
    setup: () => {
      gameContainer.innerHTML = `
        <p>5 🍎 + 🎁 = 8 🍎</p>
        <div id="choices">
          <div class="draggable" draggable="true" data-value="2">2</div>
          <div class="draggable" draggable="true" data-value="3">3</div>
          <div class="draggable" draggable="true" data-value="4">4</div>
        </div>
        <div id="drop" class="droppable">🎁</div>
      `;
      initDragDrop(2);
    }
  },
  {
    title: "关卡2：天平桥",
    description: "平衡水果天平",
    setup: () => {
      gameContainer.innerHTML = `
        <p>拖动水果到天平使它平衡</p>
        <p>式子1：左 3 🍎 + 6 🍊 = 右 5 🍌</p>
        <p>式子2：左 1 🍎 + 1 🍌 = 右 2 🍊</p>
        <div id="choices">
          <div class="draggable" draggable="true" data-value="1">🍎</div>
          <div class="draggable" draggable="true" data-value="2">🍊</div>
          <div class="draggable" draggable="true" data-value="3">🍌</div>
        </div>
        <div id="drop" class="droppable">天平⚖️</div>
      `;
      initDragDrop(null, true);
    }
  },
  {
    title: "关卡3：海岛宝箱",
    description: "鸡兔同笼问题",
    setup: () => {
      gameContainer.innerHTML = `
        <p>小笼子里共有25只小动物（鸡和兔子），共有70只脚</p>
        <p>鸡每只2只脚，兔子每只4只脚</p>
        <p>拖动数字钥匙到宝箱🎁</p>
        <div id="choices">
          <div class="draggable" draggable="true" data-value="10">10</div>
          <div class="draggable" draggable="true" data-value="15">15</div>
          <div class="draggable" draggable="true" data-value="25">25</div>
        </div>
        <div id="drop" class="droppable">🎁</div>
      `;
      initDragDrop([15,10]);
    }
  },
  {
    title: "关卡4：终极宝藏城堡",
    description: "解方程开宝藏",
    setup: () => {
      gameContainer.innerHTML = `
        <p>(x + 2) * 2 = 12</p>
        <p>拖动正确数字开宝藏🏰</p>
        <div id="choices">
          <div class="draggable" draggable="true" data-value="2">2</div>
          <div class="draggable" draggable="true" data-value="4">4</div>
          <div class="draggable" draggable="true" data-value="5">5</div>
        </div>
        <div id="drop" class="droppable">🏰</div>
      `;
      initDragDrop(4, false, () => {
        gameContainer.innerHTML = `<h2>🎉恭喜！你找到了最终宝藏！🎉</h2>
        <p>🏆✨💎✨🏆</p>`;
        nextBtn.style.display = "none";
      });
    }
  }
];

// 初始化拖拽逻辑
function initDragDrop(correct, isBalance=false, callback=null) {
  const draggables = document.querySelectorAll(".draggable");
  const drop = document.getElementById("drop");

  draggables.forEach(drag => {
    drag.addEventListener("dragstart", e => {
      e.dataTransfer.setData("text", e.target.dataset.value);
    });
  });

  drop.addEventListener("dragover", e => e.preventDefault());

  drop.addEventListener("drop", e => {
    e.preventDefault();
    const value = e.dataTransfer.getData("text");
    
    let isCorrect = false;
    if (Array.isArray(correct)) {
      isCorrect = correct.includes(parseInt(value));
    } else if (isBalance) {
      // 简单逻辑：成功即拖动任意水果（可扩展）
      isCorrect = true;
    } else {
      isCorrect = parseInt(value) === correct;
    }

    if (isCorrect) {
      alert("正确！🎉");
      if (callback) callback();
      else nextLevel();
    } else {
      alert("再试试！❌");
    }
  });
}

function nextLevel() {
  currentLevel++;
  if (currentLevel < levels.length) {
    levels[currentLevel].setup();
  } else {
    gameContainer.innerHTML = `<h2>你完成了所有关卡！🎉</h2>`;
    nextBtn.style.display = "none";
  }
}

nextBtn.addEventListener("click", () => {
  nextBtn.style.display = "none";
  levels[currentLevel].setup();
});

