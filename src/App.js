import React, { useState } from 'react';
import './App.css';

function Knight() {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('pieceId', e.target.id);
  };

  return (
    <span
      role="img"
      aria-label="knight"
      style={{ fontSize: '40px' }}
      draggable="true"
      onDragStart={handleDragStart}
      id="knight"
    >
      &#9816;
    </span>
  );
}

function Square({ black, children }) {
  const backgroundColor = black ? 'black' : '#c1c1c1';
  const color = black ? '#c1c1c1' : 'black';
  return (
    <div
      style={{
        backgroundColor,
        color,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
}

function BoardSquare({ x, y, children, handlePieceDrop, isValidMove }) {
  const black = (x + y) % 2 === 1;
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const pieceId = e.dataTransfer.getData('pieceId');
    const piece = document.getElementById(pieceId);
    if (piece) {
      handlePieceDrop(pieceId, x, y);
    }
  };

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        position: 'relative',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <Square black={black}>
        {children}
        {isOver && !isValidMove && (
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(255, 0, 0, 0.3)',
            }}
          />
        )}
      </Square>
    </div>
  );
}

function Board() {
  const [knightPosition, setKnightPosition] = useState({ x: 0, y: 1 });

  const handlePieceDrop = (pieceId, x, y) => {
    const isValid = isMoveValid(knightPosition.x, knightPosition.y, x, y);
    if (isValid) {
      setKnightPosition({ x, y });
    }
  };

  const isMoveValid = (fromX, fromY, toX, toY) => {
    const dx = Math.abs(toX - fromX);
    const dy = Math.abs(toY - fromY);
    return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
  };

  const squares = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const isValidMove =
        knightPosition.x !== null &&
        knightPosition.y !== null &&
        isMoveValid(knightPosition.x, knightPosition.y, i, j);
      squares.push(
        <div key={i * 8 + j} style={{ width: '50px', height: '50px' }}>
          <BoardSquare
            x={i}
            y={j}
            handlePieceDrop={handlePieceDrop}
            isValidMove={isValidMove}
          >
            {i === knightPosition.x && j === knightPosition.y && <Knight />}
          </BoardSquare>
        </div>
      );
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        width: '400px',
        height: '400px',
        margin: 'auto',
      }}
    >
      {squares}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <h2>Chessboard Formulatrix</h2>
      <Board />
    </div>
  );
}

export default App;
