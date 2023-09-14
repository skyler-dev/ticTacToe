import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className='square' onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); // 교대로. 기본적으로 첫 번째 수는 'X'
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    // 이미 둔 수 덮어쓰기 방지 또는 승자가 정해졌는 지 확인
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // 승자 선언
  const winner = calculateWinner(squares);
  const status = winner
    ? '승자: ' + winner
    : '다음 선수: ' + (xIsNext ? 'X' : 'O');

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board-row'>
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className='board-row'>
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className='board-row'>
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// 헬퍼 함수
/**
 * Board 전이나 후에 정의하는 지 여부는 중요하지 않다.
 * 컴포넌트를 편집할 때마다 스크롤해서 헬퍼함수를 지나갈 필요가 없도록 마지막에 배치한다.
 */
function calculateWinner(squares) {
  // 가로 새로 대각선 idex
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
