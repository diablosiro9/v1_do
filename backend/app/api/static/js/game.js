const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');


const player1 = {
    x: 50,
    y: canvas.height / 2 - 50, // Position initiale au milieu de l'écran
    width: 10,
    height: 100,
    color: 'blue', // Couleur noire
    speed: 5 // Vitesse de déplacement
};

const player2 = {
    x: canvas.width - 60,
    y: canvas.height / 2 - 50,
    width: 10,
    height: 100,
    color: 'red',
    speed: 5
};

// Dessiner les plateformes des joueurs
function drawPlayers() {
    ctx.fillStyle = player1.color;
    ctx.fillRect(player1.x, player1.y, player1.width, player1.height);

    ctx.fillStyle = player2.color;
    ctx.fillRect(player2.x, player2.y, player2.width, player2.height);
}

// Définition des joueurs
let currentPlayer = null; // Le joueur actuellement sélectionné

// Fonction pour choisir le joueur
function choosePlayer(player) {
    currentPlayer = player;
}

// Gestion de la sélection du joueur
document.addEventListener('keydown', function(event) {
    // Si la touche '1' est pressée, choisir le joueur 1
    if (event.key === '1') {
        choosePlayer(player1);
    }
    // Si la touche '2' est pressée, choisir le joueur 2
    else if (event.key === '2') {
        choosePlayer(player2);
    }
});


// Gérer le mouvement des plateformes des joueurs
document.addEventListener('keydown', function(event) {
    // Player 1
    if (event.key === 'w' && player1.y > 0) {
        player1.y -= player1.speed; // Déplacer vers le haut
    } else if (event.key === 's' && player1.y + player1.height < canvas.height) {
        player1.y += player1.speed; // Déplacer vers le bas
    }

    // Player 2
    if (event.key === 'ArrowUp' && player2.y > 0) {
        player2.y -= player2.speed; // Déplacer vers le haut
    } else if (event.key === 'ArrowDown' && player2.y + player2.height < canvas.height) {
        player2.y += player2.speed; // Déplacer vers le bas
    }
});

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    dx: 2,
    dy: -2
};

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
}


// Mettez en place un système de points
let scorePlayer1 = 0;
let scorePlayer2 = 0;

function drawScores() {
    ctx.font = '24px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText('Player 1: ' + scorePlayer1, 20, 30);
    ctx.fillText('Player 2: ' + scorePlayer2, canvas.width - 150, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black'; // Remplacez 'blue' par la couleur de votre choix
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    drawBall();
    drawScores();
    drawPlayers();
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.dy > canvas.height - ball.radius || ball.y + ball.dy < ball.radius) {
        ball.dy = -ball.dy;
    }
    if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
        ball.dx = -ball.dx;
    }
    if (currentPlayer) {
        if (event.key === 'w' && currentPlayer.y > 0) {
            currentPlayer.y -= currentPlayer.speed; // Déplacer vers le haut
        } else if (event.key === 's' && currentPlayer.y + currentPlayer.height < canvas.height) {
            currentPlayer.y += currentPlayer.speed; // Déplacer vers le bas
        }
    }
}

// setInterval(draw, 10);

console.log(canvas);
console.log(ctx);
console.log(player1);
console.log(player2);

document.addEventListener('keydown', function(event) {
    console.log('Touche pressée : ', event.key);
    // Ajoutez d'autres instructions de débogage ou de traitement ici
});


window.onload = function() {
    draw();
};
