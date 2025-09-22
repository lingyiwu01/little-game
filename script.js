document.addEventListener("DOMContentLoaded", () => {

  const character = document.getElementById("character");
  const treasure = document.getElementById("treasure");
  const map = document.getElementById("map");

  let currentLevel = 0;

  const levelPaths = [
    [{x:20,y:20},{x:150,y:20},{x:150,y:100},{x:300,y:100},{x:500,y:300}],
    [{x:20,y:200},{x:200,y:200},{x:400,y:200}],
    [{x:20,y:50},{x:150,y:150},{x:500,y:300}],
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

  function openTreasure(callback) {
    treasure.classList.add("open");
    setTimeout(() => {
      treasure.classList.remove("open");
      if(callback) callback();
    }, 1200);
  }

  function setupLevel(level) {
    map.innerHTML = ""; // 清空地图元素
    treasure.classList.remove("open");

    if(level === 0){
      // 关卡1：迷宫入门 + 拖动数字开宝箱
      moveCharacter(levelPaths[level], () => {
        alert("到达宝箱！拖动正确数字开宝箱");
        // 模拟拖动正确数字开宝箱
        openTreasure(() => setupLevel(1));
      });
    } else if(level === 1){
      // 关卡2：天平桥
      const balance = document.createElement("div");
      balance.id = "balance";
      map.appendChild(balance);
      moveCharacter(levelPaths[level], () => {
        alert("到达天平！拖动水果平衡");
        // 模拟完成天平平衡
        openTreasure(() => setupLevel(2));
      });
    } else if(level === 2){
      // 关卡3：鸡兔同笼
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
      moveCharacter(levelPaths[level], () => {
        alert("到达宝箱！拖动正确数字开宝箱");
        openTreasure(() => setupLevel(3));
      });
    } else if(level === 3){
      // 关卡4：终极宝藏
      moveCharacter(levelPaths[level], () => {
        alert("到达城堡！解方程开宝藏");
        openTreasure();
      });
    }
  }

  // 自动加载第一关
  setupLevel(currentLevel);

});


