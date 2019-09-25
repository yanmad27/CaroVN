import React from 'react';
import 'shared/styles/App.css';
import Board from 'components/board/Board';



function App() {

  let onPlayAgainClick = () => {

    setResetBoard(resetBoard + 1);
    setWinner(undefined);
    setWinIndex(undefined);
    setWinType(undefined);
    setBoardData(createDefaultBoard());
  }

  let createDefaultBoard = () => {
    let defaultBoardData = [];
    for (let i = 0; i < 30; i++) {

      let tem = [];
      for (let j = 0; j < 30; j++) {
        tem.push(' ');
      }
      defaultBoardData.push(tem);
    }
    return defaultBoardData;
  }


  const [boardData, setBoardData] = React.useState(createDefaultBoard());
  const [resetBoard, setResetBoard] = React.useState(false);
  const [winner, setWinner] = React.useState(undefined);
  const [winIndex, setWinIndex] = React.useState(undefined);
  const [winType, setWinType] = React.useState(undefined);


  let s_winner = '';
  if (winner === true) {
    s_winner = 'x';
  } else if (winner === false) {
    s_winner = 'o';
  }
  return (
    <div className="App" key={1}>
      <span key={1}>CARO VN</span>
      <Board
        key={resetBoard}
        width={20} height={20}
        resetBoard={resetBoard}
        boardData={boardData}
        winner={winner} setWinner={setWinner}
        winType={winType} setWinType={setWinType}
        winIndex={winIndex} setWinIndex={setWinIndex}
      />
      <button onClick={onPlayAgainClick}>Play again</button>
      <div>
        <span hidden={winner === undefined ? true : false} className="Winner" >Winner is {s_winner}</span>
      </div>
    </div>
  );
}

export default App;
