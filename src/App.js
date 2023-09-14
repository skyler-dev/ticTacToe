import { useState } from 'react';

function Square({ value, onSquareClick, check }) {
  return (
    <button
      className={!check ? 'square' : 'square winning-square'}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove}) {
  const { winner, winningIdxs } = getWinnerAndIdxs(squares);
  function handleClick(i) {
    // 이미 둔 수 덮어쓰기 방지 또는 승자가 정해졌는 지 확인
    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const status = winner
    ? '승자: ' + winner
    : (currentMove === 9 ? '무승부' : '다음 선수: ' + (xIsNext ? 'X' : 'O'));

  const rows = Array.from(Array(3), () => Array(3).fill(0)).map(
    (row, rowIdx) => {
      return (
        <div key={rowIdx} className='board-row'>
          {row.map((_, colIdx) => {
            const squareIdx = rowIdx * 3 + colIdx;
            const check = winningIdxs.includes(squareIdx);
            return (
              <Square
                key={squareIdx}
                value={squares[squareIdx]}
                check={check}
                onSquareClick={() => handleClick(squareIdx)}
              />
            );
          })}
        </div>
      );
    }
  );

  return (
    <>
      <div className='status'>{status}</div>
      {rows}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); // 사용자가 보고 있는 단계의 수(move)
  const [ascending, setAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0; // (동기화) 현재 선택한 수가 홀수일 때, 다음 선수는 O
  const currentSquares = history[currentMove]; // 현재 선택한 수 렌더링 하도록

  // 게임 업데이트를 위해 Board 컴포넌트가 호출할 예정
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // 과거의 수(move)들로 점프할 수 있는 버튼 리스트 표시용
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = '#' + move + '의 수로 가기';
    } else {
      description = '게임 시작지점으로 가기';
    }

    if (move === currentMove) {
      if (move === 0) return <li key={move}>{'시작지점에 있습니다.'}</li>;
      return <li key={move}>{'#' + move + '의 수에 있습니다.'}</li>;
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          currentMove={currentMove}
          onPlay={handlePlay}
        />
      </div>
      <div className='game-info'>
        <button onClick={() => setAscending(!ascending)}>정렬 반전하기</button>
        <ol>{ascending ? moves : moves.toReversed()}</ol>
      </div>
    </div>
  );
}

// 헬퍼 함수
/**
 * Board 전이나 후에 정의하는 지 여부는 중요하지 않다.
 * 컴포넌트를 편집할 때마다 스크롤해서 헬퍼함수를 지나갈 필요가 없도록 마지막에 배치한다.
 */
function getWinnerAndIdxs(squares) {
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
      return { winner: squares[a], winningIdxs: [a, b, c] };
    }
  }
  return { winner: null, winningIdxs: [null, null, null] };
}
