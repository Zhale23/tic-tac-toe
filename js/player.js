function guardarJugadores() {
    // Obtener los valores de los inputs
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if(player1=='' & player2==''){
        alert('Debes ingresar los nombres de los jugadores');
        return
    }else{
            // Guardar en localStorage (web)
        localStorage.setItem('player1', player1);
        localStorage.setItem('player2', player2);
        window.location.href = 'playGame.html';
    }
}

