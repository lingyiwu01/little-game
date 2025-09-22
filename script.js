const levels = [
  {question: "关卡1: x + 3 = 7 🕵️‍♂️🍎", options: [3, 4, 5], answer: 4},
  {question: "关卡2: 2x = 8 🌉🍊", options: [2, 4, 6], answer: 4},
  {question: "关卡3: y + 5 = 12 🏝️🍎", options: [5, 6, 7], answer: 7},
  {question: "关卡4: (x + 2) * 2 = 12 🏰💰", options: [4, 5, 6], answer: 4}
];

let currentLevel = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const messageEl = document.getElementById("message");

function loadLevel(levelIndex) {
  const level = levels[levelIndex];
  questionEl.textContent = level.question;
  optionsEl.innerHTML = "";
  messageEl.textContent = "";

  level.options.forEach(opt => {
    const btn = document.createElement("div");
    btn.className = "option";
    btn.textContent = "💰 " + opt;
    btn.onclick = () => checkAnswer(opt, level.answer);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(choice, answer) {
  if (choice === answer) {
    messageEl.textContent = "🎉 正确！宝箱打开啦！";
    currentLevel++;
    if (currentLevel < levels.length) {
      setTimeout(() => loadLevel(currentLevel), 1500);
    } else {
      messageEl.textContent = "🏆 恭喜你完成所有关卡！";
      questionEl.textContent = "终极宝藏出现啦！💎✨";
      optionsEl.innerHTML = "";
    }
  } else {
    messageEl.textContent = "❌ 错啦，再试一次！";
  }
}

// 开始游戏
loadLevel(currentLevel);
