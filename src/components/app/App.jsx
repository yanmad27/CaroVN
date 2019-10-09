/* eslint-disable import/no-unresolved */
import React from 'react';
import { connect } from 'react-redux';
import createDefaultBoard from 'reduxs/handlers/boardHandler';
import * as BoardActions from 'reduxs/reducers/board/action';
import '../../shared/styles/App.css';
import Board from '../board/Board';

class App extends React.Component {
  onPlayAgainClick = () => {
    const { resetBoard } = this.props;
    const {
      setResetBoard,
      setWinner,
      setWinIndex,
      setWinType,
      setBoardData,
      setCurrentMove,
      setMoveHistory
    } = this.props;
    setResetBoard(resetBoard + 1);
    setWinner(undefined);
    setWinIndex(undefined);
    setWinType(undefined);
    setBoardData(createDefaultBoard());
    setCurrentMove(undefined);
    setMoveHistory([]);
  };

  // eslint-disable-next-line no-unused-vars
  onJumpClick = value => _event => {
    const { setIsX, setCurrentMove } = this.props;
    setIsX(!value.isX);
    setCurrentMove(value);
  };

  drawMoveHistory = () => {
    const { moveHistory, currentMove } = this.props;
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
          <button onClick={this.onJumpClick(value)} type="button">
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

  //  tmp_winner = 'asdasd';
  // if (winner === true) {
  //   s_winner = 'x';
  // } else if (winner === false) {
  //   s_winner = 'o';
  // }

  getWinner = () => {
    const { winner } = this.props;
    if (winner === true) {
      return 'x';
    }
    if (winner === false) {
      return 'o';
    }
    return '';
  };

  render() {
    const { showNewMoveFirst, resetBoard, winner } = this.props;
    const { setShowNewMoveFirst } = this.props;
    return (
      <div className="App">
        <span>CARO VN</span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingLeft: 200
          }}
        >
          <Board key={resetBoard} width={20} height={20} />
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
              {this.drawMoveHistory()}
            </div>
          </div>
        </div>
        <button type="button" onClick={this.onPlayAgainClick}>
          Play again
        </button>
        <div>
          <span hidden={winner === undefined} className="Winner">
            Winner is {this.getWinner()}
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = rootState => {
  return {
    boardData: rootState.boardData,
    winner: rootState.winner,
    winType: rootState.winType,
    winIndex: rootState.winIndex,
    moveHistory: rootState.moveHistory,
    currentMove: rootState.currentMove,
    isX: rootState.isX
  };
};

const mapDispatchToProps = {
  setBoardData: BoardActions.doSetBoardData,
  setCurrentMove: BoardActions.doSetCurrentMove,
  setIsX: BoardActions.doSetIsX,
  setWinIndex: BoardActions.doSetWinIndex,
  setWinType: BoardActions.doSetWinType,
  setMoveHistory: BoardActions.doSetMoveHistory,
  setWinner: BoardActions.doSetWinner,
  setResetBoard: BoardActions.doSetResetBoard
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
