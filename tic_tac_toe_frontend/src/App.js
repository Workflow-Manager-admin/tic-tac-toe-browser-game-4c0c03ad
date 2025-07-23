import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner 
    ? `Winner: ${winner}`
    : isDraw 
    ? "Game Draw!"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="App">
      <div className="game">
        <h1 className="game-title">Tic Tac Toe</h1>
        <div className="game-status" style={{ color: winner ? 'var(--accent)' : 'var(--primary)' }}>
          {status}
        </div>
        <Board squares={squares} onClick={handleClick} />
        <button 
          className="reset-button"
          onClick={handleReset}
          style={{ backgroundColor: 'var(--secondary)' }}
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}

export default App;
