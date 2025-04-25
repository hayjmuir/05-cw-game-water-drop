let gameActive = false;
let gameInterval;
let score = 0;
let difficulty = 'normal';
let winScore = 20;
let dropInterval = 1000;

document.getElementById('start-btn').addEventListener('click', startGame);

document.querySelectorAll('.difficulty-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      difficulty = btn.dataset.mode;
      switch (difficulty) {
          case 'easy':
              winScore = 15;
              dropInterval = 1200;
              break;
          case 'normal':
              winScore = 20;
              dropInterval = 1000;
              break;
          case 'hard':
              winScore = 25;
              dropInterval = 700;
              break;
      }
      document.getElementById('message-display').textContent = `Mode: ${difficulty.toUpperCase()}`;
  });
});

function startGame() {
  if (gameActive) return;
  gameActive = true;
  score = 0;
  updateScore(0);
  document.getElementById('start-btn').disabled = true;
  clearMessages();
  gameInterval = setInterval(createDrop, dropInterval);
}

function updateScore(change) {
  score += change;
  if (score < 0) score = 0;
  document.getElementById('score').textContent = score;

  if (score >= winScore) {
      clearInterval(gameInterval);
      gameActive = false;
      document.getElementById('start-btn').disabled = false;
      showMessage('You win!', '#00C851');
  }
}

function showMessage(text, color) {
    const msg = document.getElementById('message-display');
    msg.style.display = 'block';
    msg.style.backgroundColor = color;
    msg.textContent = text;
    setTimeout(() => {
        msg.style.display = 'none';
    }, 1200);
}

function clearMessages() {
    const msg = document.getElementById('message-display');
    msg.style.display = 'none';
    msg.textContent = '';
}

function createDrop() {
    const drop = document.createElement('div');
    const isBadDrop = Math.random() < 0.2;
    drop.className = isBadDrop ? 'water-drop bad-drop' : 'water-drop';

    const scale = 0.8 + Math.random() * 0.7;
    drop.style.transform = `scale(${scale})`;

    const gameWidth = document.getElementById('game-container').offsetWidth;
    const randomX = Math.random() * (gameWidth - 40);
    drop.style.left = `${randomX}px`;
    drop.style.animationDuration = '4s';

    drop.addEventListener('click', () => {
        drop.remove();
        if (isBadDrop) {
            updateScore(-3);
            showMessage('Oops! Bad drop!', '#ff4444');
        } else {
            updateScore(1);
            showMessage('Nice catch!', '#4FCB53');
        }
    });

    drop.addEventListener('animationend', () => {
        drop.remove();
        if (!isBadDrop) {
            updateScore(-1);
            showMessage('Missed a good drop!', '#FFA500');
        }
    });

    document.getElementById('game-container').appendChild(drop);
}
