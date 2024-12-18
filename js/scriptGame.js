let gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

let winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let contPlayer = 0;
let currentPlayer = '';
let gameOver = false;
let winner = '';

let contPlayer1=0 //won's rounds player 1
let contPlayer2=0 // won's rounds player 2
let player1='X'
let player2='O'
let currentPlayerName=''

const namePlayer1 = localStorage.getItem('player1');
const namePlayer2 = localStorage.getItem('player2');

// show the names on the web
document.getElementById('showName1').textContent = namePlayer1;
document.getElementById('showName2').textContent = namePlayer2;

const table = document.querySelector('.table');
const cells = document.querySelectorAll('.cell'); // querySelectorAll no se queda con una sola clase
                                                //sino que toma todos los elementos con esa misma clase
const restart = document.querySelector('.btn-restart');
// console.log(cells)

// Evento para manejar los clics en las celdas
table.addEventListener('click', (event) => {
    if (gameOver==true) return; // no more moves if the game is over

    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    const roundsPlayer1=document.getElementById('rounds-won-1')
    const roundsPlayer2=document.getElementById('rounds-won-2')


    if (cell.textContent !== '') return; // Evitar sobrescribir una celda ya jugada

    
    // Determinar el jugador actual
    //currentPlayer = contPlayer % 2 == 0 ? 'X' : 'O';
    if(contPlayer%2==0){
        currentPlayer=player1
    }else{
        currentPlayer=player2
    }
    // console.log(currentPlayer)

    //asignar colores en cada movimiento
    //remover clases anteriores para evitar confusiones
    cell.classList.remove('redPlayer', 'greenPlayer');

    
    if (currentPlayer=='X'){
        cell.classList.add('redPlayer');
        currentPlayerName=namePlayer1
    }else if (currentPlayer=='O'){
        cell.classList.add('greenPlayer');
        currentPlayerName=namePlayer2
    }

    cell.textContent = currentPlayer;

    // Actualizar la matriz `gameBoard`
    const row = Math.floor(cellIndex / 3);
    const col = cellIndex % 3;
    gameBoard[row][col] = currentPlayer;
    // gameBoard[2][2]=currentPlayer;
    // (currentPlayer=='X')?'O':'X';


    contPlayer++;


    // Verificar si hay un ganador
    if (checkWinner()){
        //si el jugador actual es el jugador uno
        //sumar partidas ganadas
        if (currentPlayer==player1){
            if (contPlayer1<5){
                contPlayer1+=1;
                roundsPlayer1.textContent= contPlayer1;
                alert (`the player ${currentPlayerName}(${currentPlayer}) wins the round`)
                // mostrarVentanaPrestamo()

            }
            // if(contPlayer1==5){
            //     alert (`the player ${namePlayer1} wins the game`)
            // }else if(contPlayer1>5){
            //     return
            }else if(currentPlayer==player2){
            if (contPlayer2<5){
                contPlayer2+=1;
                roundsPlayer2.textContent=contPlayer2
                alert (`the player ${currentPlayerName}(${currentPlayer}) wins the round`)

                // mostrarVentanaPrestamo()
            }
            // if(contPlayer1==5 || contPlayer2==5){
            //     alert (`the player ${currentPlayer} wins the game`)
            // }else if(contPlayer1>5 || contPlayer2>5){
            //     return
            // }
        }
        if(contPlayer1==5 || contPlayer2==5){
            mostrarVentanaPrestamo()
            // alert (`the player ${currentPlayerName}(${currentPlayer}) wins the game`)
        }
        // else if(contPlayer1>=5 || contPlayer2>=5){
        //     return
        // }
        gameOver = true;
        //return;
    }

    // Verificar si hay empate
    if (contPlayer === 9 && !gameOver) {
        alert('Es un empate');
        gameOver = true;
    }
});

// Validar combinaciones ganadoras
function checkWinner() {
    // Convertir `gameBoard` a un arreglo unidimensional para validar con combinaciones ganadoras
    const flatBoard = gameBoard.flat();
   // console.log(flatBoard)
    for(let i=0; i<winningCombinations.length; i++){
       let combination=winningCombinations[i]
     //   console.log(combination)
        const a=combination[0]
        const b=combination[1]
        const c=combination[2]
        if(flatBoard[a] && flatBoard[a] === flatBoard[b] && flatBoard[a] === flatBoard[c]){
            //console.log(a, b ,c)
            return true;
        }
    }
    return false;
}

// Reiniciar el juego
restart.addEventListener('click', () => {
    // Reiniciar el tablero gráfico
    cells.forEach(cell => (cell.textContent = ''));

    // Reiniciar la matriz `gameBoard` y otras variables
    gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    contPlayer = 0;
    // (currentPlayer=='X')?'O':'X';
   // (player2=='X')?'O':'X';
   // currentPlayer = '';
    gameOver = false;

    // console.log(player1);
    // console.log(player2);
    console.log(currentPlayer)

});
function mostrarVentanaPrestamo() {
    winner=`the winner of the game is ${currentPlayerName}(${currentPlayer}) `;
    let textWinner=document.querySelector('.winner')
    textWinner.textContent=winner
    document.getElementById('miVentana').style.display = 'block';
    document.getElementById('fondoOscuro').style.display = 'block';
}
function cerrarVentana() {
    document.getElementById('miVentana').style.display = 'none';
    document.getElementById('fondoOscuro').style.display = 'none';
    location.reload();
}
function goBack(){
    window.location.href = 'selectPlayer.html';
}
