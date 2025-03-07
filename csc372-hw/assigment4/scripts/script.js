/**
 * Name: jahsiyah varona
 * Date: 03.07.2025
 * CSC 372
 *
 * Description: Contains the game logic for a rock–paper–scissors game that tracks scores,
 * updates the DOM based on user and computer moves, and animates the computer's choice.
 */

document.addEventListener('DOMContentLoaded', () => {
  let gameInProgress = false;
  let wins = 0, losses = 0, ties = 0;
  const resultText = document.getElementById('result-text');
  const computerImg = document.getElementById('computer-img');
  const winsSpan = document.getElementById('wins');
  const lossesSpan = document.getElementById('losses');
  const tiesSpan = document.getElementById('ties');
  const moves = ['rock', 'paper', 'scissors'];

  /**
   * Updates the score display in the DOM.
   */
  function updateScore() {
    winsSpan.textContent = wins;
    lossesSpan.textContent = losses;
    tiesSpan.textContent = ties;
  }

  // Reset score when the reset button is clicked.
  document.getElementById('reset').addEventListener('click', () => {
    wins = 0;
    losses = 0;
    ties = 0;
    updateScore();
  });

  /**
   * Determines the winner based on the player's and computer's moves.
   * @param {string} player - The player's move.
   * @param {string} computer - The computer's move.
   * @returns {string} - Returns 'tie', 'player', or 'computer' based on the game rules.
   */
  function determineWinner(player, computer) {
    if (player === computer) return 'tie';
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      return 'player';
    }
    return 'computer';
  }

  /**
   * Starts the computer's turn with a shuffling animation and determines the outcome.
   * @param {string} playerChoice - The player's selected move.
   */
  function startComputerTurn(playerChoice) {
    gameInProgress = true;
    const shuffleInterval = setInterval(() => {
      const randomMove = moves[Math.floor(Math.random() * moves.length)];
      computerImg.src = `images/${randomMove}.PNG`;
    }, 500);

    setTimeout(() => {
      clearInterval(shuffleInterval);
      const finalComputerChoice = moves[Math.floor(Math.random() * moves.length)];
      computerImg.src = `images/${finalComputerChoice}.PNG`;

      const winner = determineWinner(playerChoice, finalComputerChoice);
      if (winner === 'tie') {
        resultText.textContent = "It's a tie!";
        ties++;
      } else if (winner === 'player') {
        resultText.textContent = "You win!";
        wins++;
        // Add win animation for visual feedback.
        resultText.classList.add('win-animation');
        // Remove animation class after animation completes.
        setTimeout(() => {
          resultText.classList.remove('win-animation');
        }, 1000);
      } else {
        resultText.textContent = "Computer wins!";
        losses++;
      }
      updateScore();
      gameInProgress = false;
    }, 3000);
  }

  // Event listener for player's move selection.
  const choices = document.querySelectorAll('.choice');
  choices.forEach(choice => {
    choice.addEventListener('click', function() {
      // Prevent new selection if a round is in progress.
      if (gameInProgress) return;

      // Remove the "selected" class from all choices.
      choices.forEach(c => c.classList.remove('selected'));
      // Add the "selected" class to the clicked choice (triggers the animated border).
      this.classList.add('selected');

      const playerChoice = this.dataset.move;
      // Reset computer image and update outcome text.
      computerImg.src = 'images/question-mark.PNG';
      resultText.textContent = "Computer is thinking...";

      // Start the computer's turn.
      startComputerTurn(playerChoice);
    });
  });
});
