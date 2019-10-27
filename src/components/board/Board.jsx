import * as React from 'react';
import { connect } from 'react-redux';
import 'shared/styles/board.scss';
import Square from 'components/square/Square';

const WinType = {
  LeftToRight: 0,
  TopToBottom: 1,
  TopLeftToBottomRight: 2,
  BottomLeftToTopRight: 3
};

class Board extends React.Component {
  switchValue = (tmpi, tmpj) => {
    const { setIsX, isX, boardData } = this.props;

    setIsX(!isX);

    boardData[tmpi][tmpj] = isX;

    const { moveHistory, currentMove } = this.props;
    const tmpIsX = isX;
    const nextMove = { i: tmpi, j: tmpj, isX: tmpIsX };
    if (moveHistory.length > 0) {
      while (
        !(
          moveHistory[moveHistory.length - 1].i === currentMove.i &&
          moveHistory[moveHistory.length - 1].j === currentMove.j
        )
      ) {
        boardData[moveHistory[moveHistory.length - 1].i][
          moveHistory[moveHistory.length - 1].j
        ] = ' ';
        moveHistory.pop();
      }
    }

    moveHistory.push(nextMove);

    const { setBoardData, setCurrentMove, setMoveHistory } = this.props;
    setBoardData(boardData);
    setCurrentMove(nextMove);
    setMoveHistory(moveHistory);

    this.isSatisfyingFiveNode(tmpi, tmpj, isX);
  };

  isSatisfyingFiveNode = (tmpi, tmpj, tmpIsX) => {
    const {
      LeftToRight,
      BottomLeftToTopRight,
      TopLeftToBottomRight,
      TopToBottom
    } = WinType;

    const { boardData } = this.props;
    const isWin = tmpIsX === true ? 'ttttt' : 'fffff';

    let val1 = ' ';
    let val2 = ' ';
    let val3 = ' ';
    let val4 = ' ';

    const index1 = { i: tmpi, j: tmpj - 4 };
    for (let k = tmpj - 4; k <= tmpj + 4; k += 1) {
      if (boardData[tmpi][k] === true) val1 += 't';
      else if (boardData[tmpi][k] === false) val1 += 'f';
      else val1 += ' ';
    }

    const index2 = { i: tmpi - 4, j: tmpj };
    for (let k = tmpi - 4; k <= tmpi + 4; k += 1) {
      if (boardData[k][tmpj] === true) val2 += 't';
      else if (boardData[k][tmpj] === false) val2 += 'f';
      else val2 += ' ';
    }

    const index3 = { i: tmpi - 4, j: tmpj - 4 };
    for (let k = tmpi - 4, h = tmpj - 4; k <= tmpi + 4; k += 1, h += 1) {
      if (boardData[k][h] === true) val3 += 't';
      else if (boardData[k][h] === false) val3 += 'f';
      else val3 += ' ';
    }

    const index4 = { i: tmpi + 4, j: tmpj - 4 };
    for (let k = tmpi + 4, h = tmpj - 4; k >= tmpi - 4; k -= 1, h += 1) {
      if (boardData[k][h] === true) val4 += 't';
      else if (boardData[k][h] === false) val4 += 'f';
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

    const { isX, setWinner, setWinType, setWinIndex } = this.props;
    const tmp = isX === false ? 't' : 'f';
    if (isWin1 > -1) {
      if (val1[isWin1 - 1] !== tmp || val1[isWin1 + 5] !== tmp) {
        index1.j += isWin1 - 1;
        setWinIndex(index1);
        setWinType(LeftToRight);
        setWinner(isX);
      }
    } else if (isWin2 > -1) {
      if (val2[isWin2 - 1] !== tmp || val2[isWin2 + 5] !== tmp) {
        index2.i += isWin2 - 1;
        setWinIndex(index2);
        setWinType(TopToBottom);
        setWinner(isX);
      }
    } else if (isWin3 > -1) {
      if (val3[isWin3 - 1] !== tmp || val3[isWin3 + 5] !== tmp) {
        index3.i += isWin3 - 1;
        index3.j += isWin3 - 1;
        setWinIndex(index3);
        setWinType(TopLeftToBottomRight);
        setWinner(isX);
      }
    } else if (isWin4 > -1) {
      if (val4[isWin4 - 1] !== tmp || val4[isWin4 + 5] !== tmp) {
        index4.i -= isWin4 - 1;
        index4.j += isWin4 - 1;
        setWinIndex(index4);
        setWinType(BottomLeftToTopRight);
        setWinner(isX);
      }
    }
  };

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
      row.push(<Square key={i} rowId={rowId + 5} colId={i + 5} />);
    }
    return <div key={rowId} style={{display:'flex', flexWrap:'nowrap'}} >{row}</div>;
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

const mapStateToProps = () => {
  return {
  };
};

const mapDispatchToProps = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);