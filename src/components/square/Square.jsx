import * as React from 'react';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import * as GameActions from 'reduxs/reducers/game/action';
import * as HistoryActions from 'reduxs/reducers/history/action';
import * as BoardActions from 'reduxs/reducers/board/action';
import WinType from 'reduxs/models/winType';
import 'shared/styles/square.scss';
import { isUndefined } from 'util';

class Square extends React.Component {

  constructor(props) {
    super(props);
    this.displayValueState = ' ';
  }

  shouldComponentUpdate(nextProps) {
    const { currentMove, boardData } = nextProps;
    const { rowId, colId } = this.props;
    const { displayValueState } = this;
    const beChangedDisplayValue = displayValueState !== boardData[rowId][colId];
    if (beChangedDisplayValue === true) this.displayValueState = ' ';
    const beClick = rowId === currentMove.row && colId === currentMove.col;
    return beClick || beChangedDisplayValue;

  }



  handleSquareClick = () => {
    const { winnerData, nextTurnValue, switchNextValue, addNewMove, rowId, colId, updateBoardData, boardData } = this.props;
    const displayValue = boardData[rowId][colId];

    if (displayValue === ' ' && isUndefined(winnerData)) {
      const willDisplayValue = nextTurnValue;
      this.displayValueState = willDisplayValue;
      switchNextValue();
      addNewMove({ row: rowId, col: colId, value: willDisplayValue });
      updateBoardData({ row: rowId, col: colId, value: willDisplayValue });
      this.isSatisfyingFiveNode(willDisplayValue);
    }
  }

  isSatisfyingFiveNode = (displayValue) => {
    const {
      LeftToRight,
      BottomLeftToTopRight,
      TopLeftToBottomRight,
      TopToBottom
    } = WinType;
    const { boardData, rowId, colId } = this.props;
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



  render() {
    const { boardData, rowId, colId } = this.props;
    const displayValue = boardData[rowId][colId];
    // console.log(`Square:: (${rowId},${colId}) render is trigger!!!`);
    return (
      <div className="containter" >
        <Button variant="contained" color="default" className="button" onClick={this.handleSquareClick}>
          <span>{displayValue}</span>
        </Button>
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
  };
};

const mapDispatchToProps = {
  addNewMove: HistoryActions.emitAddNewMoveAction,
  setWinner: GameActions.emitSetWinnerAction,
  switchNextValue: GameActions.emitSwitchNextValueAction,
  updateBoardData: BoardActions.emitUpdateBoardDataAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Square);