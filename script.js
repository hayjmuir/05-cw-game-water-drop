let gameActive = false;
let gameInterval;
let score = 0;

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    updateScore(0);
    document.getElementById('start-btn').disabled = true;
    clearMessages();
    gameInterval = setInterval(createDrop, 1000);
}

function updateScore(change) {
    score += change;
    if (score < 0) score = 0;
    document.getElementById('score').textContent = score;
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
