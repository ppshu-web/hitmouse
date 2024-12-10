// script.js
let score = 0;
let activeMole = null;
let timer;
let gameDuration = 30; // 默认游戏时间为30秒
let timeLeft = gameDuration;
let moleSpeed = 1000; // 默认地鼠出现速度为1000ms
let countdownTimer;

//切换回开始界面
function showStartScreen(){
    document.getElementById('start-screen').style.display = 'flex';
    document.getElementById('settings-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
}

// 切换到游戏界面
function showGameScreen() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
}

// 切换回设置界面
function showSettingsScreen() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('settings-screen').style.display = 'flex';
}

// 随机选择一个洞
function randomHole() {
    const holes = document.querySelectorAll('.hole');
    const randomIndex = Math.floor(Math.random() * holes.length);
    return holes[randomIndex];
}

// 开始游戏
function startGame() {
    score = 0;
    timeLeft = document.getElementById('game-time').value; // 根据设置时间调整
    moleSpeed = document.getElementById('speed').value; // 根据设置调整速度

    document.getElementById('score').textContent = '分数: 0';
    document.getElementById('timer').textContent = `剩余时间: ${timeLeft} 秒`;
    document.getElementById('start-game-button').disabled = true;

    // 切换到游戏界面
    showGameScreen();

    // 每隔 moleSpeed 时间，显示一个新的地鼠
    timer = setInterval(() => {
        if (activeMole) {
            activeMole.classList.remove('mole');
        }
        activeMole = randomHole();
        activeMole.classList.add('mole');
    }, moleSpeed);

    // 倒计时功能
    countdownTimer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = `剩余时间: ${timeLeft} 秒`;

        if (timeLeft <= 0) {
            stopGame();
        }
    }, 1000);
}

// 停止游戏
function stopGame() {
    clearInterval(timer);
    clearInterval(countdownTimer);
    if (activeMole) {
        activeMole.classList.remove('mole');
    }
    activeMole = null;
    document.getElementById('start-game-button').disabled = false;
    window.alert("得分为"+score)

    // 游戏结束后，可以切换回设置界面
    showStartScreen();
}

// 重新开始游戏
function restartGame() {
    stopGame(); // 首先停止当前的游戏
    startGame(); // 然后重新开始游戏
}

// 点击地鼠得分
document.querySelectorAll('.hole').forEach(hole => {
    hole.addEventListener('click', () => {
        if (hole === activeMole) {
            score++;
            document.getElementById('score').textContent = '分数: ' + score;
            hole.classList.remove('mole');
            activeMole = null;
        }
    });
});

//点击"设置"按钮，进入设置界面
document.getElementById('settings-button').addEventListener('click', showSettingsScreen);

//点击"返回"按钮，返回开始界面
document.getElementById('return-button').addEventListener('click', showStartScreen)

// 点击“开始游戏”按钮，开始游戏
document.getElementById('start-game-button').addEventListener('click', startGame);

// 点击“停止游戏”按钮，停止游戏
document.getElementById('stop-button').addEventListener('click', stopGame);

// 点击“重新开始游戏”按钮，重新开始游戏
document.getElementById('restart-button').addEventListener('click', restartGame);


