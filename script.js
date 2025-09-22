const character = document.getElementById("character");
const treasure = document.getElementById("treasure");
const nextBtn = document.getElementById("next-btn");
const map = document.getElementById("map");

let currentLevel = 0;

// 每关侦探移动路径
const levelPaths = [
  // 关卡1迷宫
  [{x:20,y:20},{x:150,y:20},{x:150,y:100},{x:300,y:100},{x:500,y:300}],
  // 关卡2天平桥
  [{x:20,y:200},{x:200,y:200},{x:400,y:200}],
  // 关卡3海岛宝箱
  [{x:20,y:50},{x:150,y:150},{x:500,y:300}],
  // 关卡4城堡
  [{x:20,y:20},{x:300,y:150},{x:500,y:300}]
];

function moveCharacter(path, callback) {
  let i = 0;
  function nextStep() {
    if(i >= path.length) {
      if(callback) callback();
      return;
    }
    character.style.left = path[i].x + "px";
    character.style.top = path[i].y + "px";
    i++;
    setTimeout(nextStep, 800);
  }
  nextStep();
}

// 打开宝箱动画
function openTreasure() {
  treasure.classList.add("open");
}

// 初始化关卡
function setupLevel(level) {
  treasure.classList.remove("open");
  if(level === 0){
    // 关卡1：迷宫入门
    moveCharacter(levelPaths[level], ()=> alert("到达宝箱！拖动正确数字开宝箱"));
  } else if(level === 1){
    // 关卡2：天平桥
    const balance = document.createElement("div");
    balance.id = "balance";
    map.appendChild(balance);
    moveCharacter(levelPaths[level], ()=> alert("到达天平！拖动水果平衡"));
  } else if(level === 2){
    // 关卡3：鸡兔同笼
    // 显示鸡兔
    for(let i=0;i<15;i++){
      const chicken = document.createElement("div");
      chicken.className="chicken";
      chicken.style.left = (50+i*20)+"px";
      chicken.style.top = "250px";
      chicken.innerText="🐥";
      map.appendChild(chicken);
    }
    for(let i=0;i<10;i++){
      const rabbit = document.createElement("div");
      rabbit.className="rabbit";
      rabbit.style.left = (50+i*20)+"px";
      rabbit.style.top = "300px";
      rabbit.innerText="🐇";
      map.appendChild(rabbit);
    }
    moveCharacter(levelPaths[level], ()=> alert("到达宝箱！拖动正确数字开宝箱"));
  } else if(level === 3){
    // 关卡4：终极宝藏
    moveCharacter(levelPaths[level], ()=> {
      alert("到达城堡！解方程开宝藏");
      openTreasure();
    });
  }
}

nextBtn.addEventListener("click", ()=>{
  setupLevel(currentLevel);
  currentLevel++;
  if(currentLevel>=4) nextBtn.style.display="none";
});

