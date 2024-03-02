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
    console.log('Player selected:', currentPlayer);
}

// Gestion de la sélection du joueur
// Gérer le mouvement des plateformes des joueurs

function handleKeyEvents(event) {
    console.log('Touche pressée : ', event.key);
    // Si la touche '1' est pressée, choisir le joueur 1
    if (event.key === '1') {
        choosePlayer(player1);
    }
    // Si la touche '2' est pressée, choisir le joueur 2
    else if (event.key === '2') {
        choosePlayer(player2);
    }
    if (currentPlayer) {
        // Gérer le mouvement du joueur sélectionné
        if (event.key === 'w' && currentPlayer.y > 0) {
            currentPlayer.y -= currentPlayer.speed; // Déplacer vers le haut
        } else if (event.key === 's' && currentPlayer.y + currentPlayer.height < canvas.height) {
            currentPlayer.y += currentPlayer.speed; // Déplacer vers le bas
        }
    }
}
    
document.addEventListener('keydown', handleKeyEvents);


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

function resetBall() {
    // Réinitialiser la position de la balle au centre de la zone de jeu
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    // Réinitialiser la direction de la balle (vous pouvez ajuster la direction selon votre logique de jeu)
    ball.dx = -ball.dx;
    ball.dy = -ball.dy;
    // Réinitialiser les positions des plateformes des joueurs
    player1.y = canvas.height / 2 - 50;
    player2.y = canvas.height / 2 - 50;
}


function handleCollision() {
    if (ball.x - ball.radius <= 0) {
        // La balle a atteint le mur gauche, le joueur 2 marque un point
        scorePlayer2++;
        resetBall(); // Réinitialiser la position de la balle
        return; // Sortir de la fonction après la gestion de la collision
    }
    if (ball.x + ball.radius >= canvas.width) {
        // La balle a atteint le mur droit, le joueur 1 marque un point
        scorePlayer1++;
        resetBall(); // Réinitialiser la position de la balle
        return; // Sortir de la fonction après la gestion de la collision
    }
    // Collision avec le joueur 1   
    if (ball.x - ball.radius <= player1.x + player1.width &&
        ball.y >= player1.y && ball.y <= player1.y + player1.height) {
        ball.dx = -ball.dx; // Inverser la direction horizontale de la balle
    }

    // Vérifier la collision avec le joueur 2
    if (ball.x + ball.radius >= player2.x &&
        ball.y >= player2.y && ball.y <= player2.y + player2.height) {
        ball.dx = -ball.dx; // Inverser la direction horizontale de la balle
    }
    // Collision avec le joueur 2 (à implémenter de manière similaire)

    // Collision avec les bords du terrain (à implémenter de manière similaire)
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
    handleCollision();
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
}

function update() {
    draw(); // Dessiner le jeu
    // setInterval(update, 10);
    // Vous pouvez également mettre d'autres logiques de mise à jour ici
}

console.log(canvas);
console.log(ctx);
console.log(player1);
console.log(player2);



window.onload = function() {
    setInterval(update, 16);
   

    const input = document.getElementById('chat-input');

    input.addEventListener('focus', function() {
        input.setAttribute('placeholder', 'Type your message here...');
        input.style.color = '#fff'; // Change la couleur du texte de l'input
        input.style.opacity = '0.5'; // Rend le texte de l'input complètement opaque
    });

    input.addEventListener('input', function() {
        if (input.value === '') {
            input.setAttribute('placeholder', 'Type your message here...');
            input.style.color = '#fff'; // Change la couleur du texte de l'input
            input.style.opacity = '0.5'; // Rend le texte de l'input complètement opaque
        } else {
            input.removeAttribute('placeholder');
            input.style.color = 'initial'; // Rétablit la couleur par défaut du texte de l'input
            input.style.opacity = '0.5'; // Rend le texte de l'input complètement opaque
        }
    });

    input.addEventListener('blur', function() {
        if (input.value === '') {
            input.removeAttribute('placeholder');
            input.style.color = 'transparent'; // Rend le texte de l'input transparent
            input.style.opacity = '0'; // Rend le texte de l'input complètement transparent
        }
    });


    document.addEventListener('keydown', function(event) {
        // Si une flèche est pressée et qu'un joueur est sélectionné
        if (!currentPlayer && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
            // Empêcher le défilement de la page lorsque les touches de déplacement sont utilisées
            event.preventDefault();
        }
        else if (currentPlayer) {
            event.preventDefault();

            // Gérer le mouvement du joueur sélectionné
            if (event.key === 'ArrowUp' && currentPlayer.y > 0) {
                currentPlayer.y -= currentPlayer.speed; // Déplacer vers le haut
            } else if (event.key === 'ArrowDown' && currentPlayer.y + currentPlayer.height < canvas.height) {
                currentPlayer.y += currentPlayer.speed; // Déplacer vers le bas
            }
        }
    });
};
