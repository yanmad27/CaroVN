import React from 'react';
import '../../shared/styles/App.css';
import Board from '../board/Board';

function App() {
  const createDefaultBoard = () => {
    const defaultBoardData = [];
    for (let i = 0; i < 30; i += 1) {
      const tem = [];
      for (let j = 0; j < 30; j += 1) {
        tem.push(' ');
      }
      defaultBoardData.push(tem);
    }
    return defaultBoardData;
  };

  const [boardData, setBoardData] = React.useState(createDefaultBoard());
  const [resetBoard, setResetBoard] = React.useState(false);
  const [winner, setWinner] = React.useState(undefined);
  const [winIndex, setWinIndex] = React.useState(undefined);
  const [winType, setWinType] = React.useState(undefined);
  const [moveHistory, setMoveHistory] = React.useState([]);
  const [currentMove, setCurrentMove] = React.useState(undefined);
  const [isX, setIsX] = React.useState(true);
  const [showNewMoveFirst, setShowNewMoveFirst] = React.useState(true);

  const onPlayAgainClick = () => {
    setResetBoard(resetBoard + 1);
    setWinner(undefined);
    setWinIndex(undefined);
    setWinType(undefined);
    setBoardData(createDefaultBoard());
    setCurrentMove(undefined);
    setMoveHistory([]);
  };

  // eslint-disable-next-line no-unused-vars
  const onJumpClick = value => _event => {
    setIsX(!value.isX);
    setCurrentMove(value);
  };

  const drawMoveHistory = () => {
    return moveHistory.map((value, index) => {
      return (
        <div
          key={`${index * 1}`}
          style={{ display: 'flex', justifyContent: 'start' }}
        >
          <span style={{ display: 'flex' }}>
            <div style={{ width: 25 }}>{index}.</div>
            <div style={{ width: 20 }}>
              {String.fromCharCode(value.i - 5 + 65)}
            </div>
            <div style={{ width: 15 }}>{value.j - 5}</div>
            <div style={{ width: 20 }}> {value.isX ? 'X' : 'O'}</div>
          </span>
          <button onClick={onJumpClick(value)} type="button">
            Jump
          </button>
          <span>
            {currentMove.i === value.i && currentMove.j === value.j
              ? 'current'
              : ' '}
          </span>
        </div>
      );
    });
  };

  // const tmp_winner = 'asdasd';
  // if (winner === true) {
  //   s_winner = 'x';
  // } else if (winner === false) {
  //   s_winner = 'o';
  // }

  const getWinner = () => {
    if (winner === true) {
      return 'x';
    }
    if (winner === false) {
      return 'o';
    }
    return '';
  };

  return (
    <div className="App">
      <span>CARO VN</span>
      <div
        style={{ display: 'flex', justifyContent: 'center', paddingLeft: 200 }}
      >
        <Board
          key={resetBoard}
          width={20}
          height={20}
          resetBoard={resetBoard}
          boardData={boardData}
          setBoardData={setBoardData}
          winner={winner}
          setWinner={setWinner}
          winType={winType}
          setWinType={setWinType}
          winIndex={winIndex}
          setWinIndex={setWinIndex}
          moveHistory={moveHistory}
          setMoveHistory={setMoveHistory}
          currentMove={currentMove}
          setCurrentMove={setCurrentMove}
          isX={isX}
          setIsX={setIsX}
        />
        <div style={{ width: 200, padding: 20 }}>
          <div>
            <span>History</span>
            <button
              type="button"
              onClick={() => {
                setShowNewMoveFirst(!showNewMoveFirst);
              }}
            >
              Click me
            </button>
          </div>
          <div
            style={{
              overflow: 'auto',
              maxHeight: 231,
              display: showNewMoveFirst ? 'block' : 'flex',
              flexDirection: 'column-reverse'
            }}
          >
            {drawMoveHistory()}
          </div>
        </div>
      </div>
      <button type="button" onClick={onPlayAgainClick}>
        Play again
      </button>
      <div>
        <span hidden={winner === undefined} className="Winner">
          Winner is {getWinner()}
        </span>
      </div>
    </div>
  );
}

export default App;
