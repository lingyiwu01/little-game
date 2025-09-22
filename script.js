document.addEventListener("DOMContentLoaded", () => {

  const character = document.getElementById("character");
  const treasure = document.getElementById("treasure");
  const nextBtn = document.getElementById("next-btn");
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

  function openTreasure() {
    treasure.classList.add("open");
  }

  function setupLevel(level) {
    treasure.classList.remove("open");
    map.innerHTML = ""; // 清空地图元素，避免残留
    if(level === 0){
      moveCharacter(levelPaths[level], ()=> alert("到达宝箱！拖动正确数字开宝箱"));
    } else if(level === 1){
      const balance = document.createElement("div");
      balance.id = "balance";
      map.appendChild(balance);
      moveCharacter(levelPaths[level], ()=> alert("到达天平！拖动水果平衡"));
    } else if(level === 2){
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

});

