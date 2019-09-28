import React from 'react';
import 'shared/styles/App.css';
import Board from 'components/board/Board';


//just test new branch

function App() {

  let onPlayAgainClick = () => {

    setResetBoard(resetBoard + 1);
    setWinner(undefined);
    setWinIndex(undefined);
    setWinType(undefined);
    setBoardData(createDefaultBoard());
    setCurrentMove(undefined);
    setMoveHistory([]);
  }

  let onJumpClick = (value) => (event) => {

    setIsX(!value.isX);
    setCurrentMove(value);
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

  let drawMoveHistory = () => {

    return moveHistory.map((value, index) => {
      return (
        <div key={index} style={{ display: "flex", justifyContent: "start" }} >
          <span style={{ display: "flex" }}>
            <div style={{ width: 25 }}>{index}.</div>
            <div style={{ width: 20 }}>{String.fromCharCode(value.i - 5 + 65)}</div>
            <div style={{ width: 15 }}>{value.j - 5}</div>
            <div style={{ width: 20 }}> {value.isX ? "X" : "O"}</div>
          </span>
          <button onClick={onJumpClick(value)}>Jump</button>
          <span>
            {(currentMove.i === value.i && currentMove.j === value.j) ? "current" : " "}
          </span>
        </div>
      )
    })
  }


  const [boardData, setBoardData] = React.useState(createDefaultBoard());
  const [resetBoard, setResetBoard] = React.useState(false);
  const [winner, setWinner] = React.useState(undefined);
  const [winIndex, setWinIndex] = React.useState(undefined);
  const [winType, setWinType] = React.useState(undefined);
  const [moveHistory, setMoveHistory] = React.useState([]);
  const [currentMove, setCurrentMove] = React.useState(undefined);
  const [isX, setIsX] = React.useState(true);
  const [showNewMoveFirst, setShowNewMoveFirst] = React.useState(true);

//just test git
  let s_winner = '';
  if (winner === true) {
    s_winner = 'x';
  } else if (winner === false) {
    s_winner = 'o';
  }
  return (
    <div className="App" >
      <span>CARO VN</span>
      <div style={{ display: "flex", justifyContent: "center", paddingLeft: 200 }}>
        <Board
          key={resetBoard}
          width={20} height={20}
          resetBoard={resetBoard}
          boardData={boardData} setBoardData={setBoardData}
          winner={winner} setWinner={setWinner}
          winType={winType} setWinType={setWinType}
          winIndex={winIndex} setWinIndex={setWinIndex}
          moveHistory={moveHistory} setMoveHistory={setMoveHistory}
          currentMove={currentMove} setCurrentMove={setCurrentMove}
          isX={isX} setIsX={setIsX}
        />
        <div style={{ width: 200, padding: 20 }}>
          <div>
            <span>History</span>
            <button onClick={() => { setShowNewMoveFirst(!showNewMoveFirst) }}>Click me</button>
          </div>
          <div style={{ overflow: 'auto', maxHeight: 231, display: showNewMoveFirst ? "block" : "flex", flexDirection: "column-reverse" }}>
            {drawMoveHistory()}

          </div>
        </div>
      </div>
      <button onClick={onPlayAgainClick}>Play again</button>
      <div>
        <span hidden={winner === undefined ? true : false} className="Winner" >Winner is {s_winner}</span>
      </div>
    </div>
  );
}

export default App;
