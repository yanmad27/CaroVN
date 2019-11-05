/* eslint-disable no-shadow */
import * as React from 'react';
import { connect } from 'react-redux';
import 'shared/styles/board.scss';
import Square from 'components/square/Square';
import * as SocketHandlers from 'reduxs/handlers/socket/index';
import { isUndefined } from 'util';
import * as GameActions from 'reduxs/reducers/game/action';
import * as HistoryActions from 'reduxs/reducers/history/action';
import * as BoardActions from 'reduxs/reducers/board/action';

const WinType = {
  LeftToRight: 0,
  TopToBottom: 1,
  TopLeftToBottomRight: 2,
  BottomLeftToTopRight: 3
};

class Board extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    }

    SocketHandlers.subcribeNewMove(this.subcribeNewMoveCallback);

  }

  subcribeNewMoveCallback = data => {

    const { newMove } = data;

    const { row, col, } = newMove;
    console.log('subcribeNewMoveCallback', data);

    this.handleSquareClick(row, col, false);
  }

  handleSquareClick = (rowId, colId, isClientClick) => {
    const { winnerData, nextTurnValue, switchNextValue, addNewMove, updateBoardData, boardData } = this.props;
    const displayValue = boardData[rowId][colId];

    const { SocketState } = this.props;
    const from = SocketHandlers.getSocketID();
    const { host } = SocketState;

    if (isClientClick) {

      if ((from === host && nextTurnValue === 'O') || (from !== host && nextTurnValue === 'X')) return;
    }


    if (displayValue === ' ' && isUndefined(winnerData)) {
      const willDisplayValue = nextTurnValue;
      this.displayValueState = willDisplayValue;
      const nextMove = { row: rowId, col: colId, value: willDisplayValue };
      addNewMove(nextMove);
      updateBoardData(nextMove);
      switchNextValue(nextMove);
      if (isClientClick) SocketHandlers.emitNewMove({ from, host, newMove: nextMove })
      this.isSatisfyingFiveNode(rowId, colId, willDisplayValue);
    }
  }

  isSatisfyingFiveNode = (rowId, colId, displayValue) => {
    const {
      LeftToRight,
      BottomLeftToTopRight,
      TopLeftToBottomRight,
      TopToBottom
    } = WinType;
    const { boardData } = this.props;
    const isWin = displayValue === 'X' ? 'XXXXX' : 'OOOOO';

    let val1 = ' ';
    let val2 = ' ';
    let val3 = ' ';
    let val4 = ' ';

    const index1 = { i: rowId, j: colId - 4 };
    for (let k = colId - 4; k <= colId + 4; k += 1) {
      if (boardData[rowId][k] === 'X') val1 += 'X';
      else if (boardData[rowId][k] === 'O') val1 += 'O';
      else val1 += ' ';
    }

    const index2 = { i: rowId - 4, j: colId };
    for (let k = rowId - 4; k <= rowId + 4; k += 1) {
      if (boardData[k][colId] === 'X') val2 += 'X';
      else if (boardData[k][colId] === 'O') val2 += 'O';
      else val2 += ' ';
    }

    const index3 = { i: rowId - 4, j: colId - 4 };
    for (let k = rowId - 4, h = colId - 4; k <= rowId + 4; k += 1, h += 1) {
      if (boardData[k][h] === 'X') val3 += 'X';
      else if (boardData[k][h] === 'O') val3 += 'O';
      else val3 += ' ';
    }

    const index4 = { i: rowId + 4, j: colId - 4 };
    for (let k = rowId + 4, h = colId - 4; k >= rowId - 4; k -= 1, h += 1) {
      if (boardData[k][h] === 'X') val4 += 'X';
      else if (boardData[k][h] === 'O') val4 += 'O';
      else val4 += ' ';
    }

    val1 += ' ';
    val2 += ' ';
    val3 += ' ';
    val4 += ' ';

    const isWin1 = val1.indexOf(isWin); //  horizontal
    const isWin2 = val2.indexOf(isWin); //  vertical
    const isWin3 = val3.indexOf(isWin); //  top-left to bottom-right
    const isWin4 = val4.indexOf(isWin); //  bottom-left -> top-right

    const { nextTurnValue, setWinner } = this.props;
    const tmp = nextTurnValue;
    let winner;
    if (isWin1 > -1) {
      if (val1[isWin1 - 1] !== tmp || val1[isWin1 + 5] !== tmp) {
        index1.j += isWin1 - 1;
        winner = { winner: nextTurnValue, winType: LeftToRight, winIndex: index1 };
        setWinner(winner);
      }
    } else if (isWin2 > -1) {
      if (val2[isWin2 - 1] !== tmp || val2[isWin2 + 5] !== tmp) {
        index2.i += isWin2 - 1;
        winner = { winner: nextTurnValue, winType: TopToBottom, winIndex: index2 };
        setWinner(winner);
      }
    } else if (isWin3 > -1) {
      if (val3[isWin3 - 1] !== tmp || val3[isWin3 + 5] !== tmp) {
        index3.i += isWin3 - 1;
        index3.j += isWin3 - 1;
        winner = { winner: nextTurnValue, winType: TopLeftToBottomRight, winIndex: index3 };
        setWinner(winner);
      }
    } else if (isWin4 > -1) {
      if (val4[isWin4 - 1] !== tmp || val4[isWin4 + 5] !== tmp) {
        index4.i -= isWin4 - 1;
        index4.j += isWin4 - 1;
        winner = { winner: nextTurnValue, winType: BottomLeftToTopRight, winIndex: index4 };
        setWinner(winner);
      }
    }
  }

  isWinSquare = (i, j) => {
    const { winIndex, winType } = this.props;

    if (winIndex === undefined) return false;

    const I = winIndex.i;
    const J = winIndex.j;
    const { LeftToRight, TopLeftToBottomRight, TopToBottom } = WinType;

    switch (winType) {
      case LeftToRight:
        return i === I && j >= J && j <= J + 4;
      case TopToBottom:
        return i >= I && i <= I + 4 && j === J;
      case TopLeftToBottomRight:
        return i >= I && j >= J && i <= I + 4 && j <= J + 4 && i - j === I - J;
      default:
        return i <= I && j >= J && i >= I - 4 && j <= J + 4 && i + j === I + J;
    }
  };

  getValueOfSquare = (i, j) => {
    const { currentMove, moveHistory } = this.props;
    let rs;
    for (let index = 0; index < moveHistory.length; index += 1) {
      const value = moveHistory[index];
      if (i === value.i && j === value.j) {
        rs = value.isX;
        break;
      }
      if (currentMove) {
        if (value.i === currentMove.i && value.j === currentMove.j) {
          break;
        }
      }
    }

    if (rs === undefined) {
      return ' ';
    }
    return rs ? 'x' : 'o';
  };

  Row = (width, rowId) => {
    const row = [];
    for (let i = 0; i < width; i += 1) {
      row.push(<Square key={i} rowId={rowId + 5} colId={i + 5} emitNewMove={this.emitNewMove} handleSquareClick={this.handleSquareClick} />);
    }
    return <div key={rowId} style={{ display: 'flex', flexWrap: 'nowrap' }} >{row}</div>;
  };

  drawBoard = (height, width) => {
    const board = [];
    for (let i = 0; i < height; i += 1) {
      board.push(this.Row(width, i));
    }
    return board;
  };



  render() {
    const { width, height, resetBoard } = this.props;
    return (
      <div>
        <div key={resetBoard} style={{ display: 'flex', flexDirection: 'row' }}>
          <div className="Board">{this.drawBoard(width, height)}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    nextTurnValue: state.GameState.nextTurnValue,
    currentMove: state.HistoryState.currentMove,
    boardData: state.BoardState.boardData,
    winnerData: state.GameState.winnerData,
    reRenderBoard: state.BoardState.reRender,
    SocketState: state.SocketState,
  };
};

const mapDispatchToProps = {
  addNewMove: HistoryActions.addNewMoveAction,
  setWinner: GameActions.emitSetWinnerAction,
  switchNextValue: GameActions.emitSwitchNextValueAction,
  updateBoardData: BoardActions.emitUpdateBoardDataAction,
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);