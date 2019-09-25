import * as React from 'react';
import 'shared/styles/Board.css';
import Square from 'components/square/Square';

const WinType = {
    LeftToRight: 0,
    TopToBottom: 1,
    TopLeftToBottomRight: 2,
    BottomLeftToTopRight: 3,
}

class Board extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            isX: true,
        }
    }

    switch = (i, j) => {

        this.setState({
            isX: !this.state.isX,
        })

        let { boardData } = this.props;
        boardData[i][j] = this.state.isX;

        this.isSatisfyingFiveNode(i, j, this.state.isX);

    }

    isSatisfyingFiveNode = (i, j, isX) => {

        const { LeftToRight, BottomLeftToTopRight, TopLeftToBottomRight, TopToBottom } = WinType;

        let { boardData } = this.props;
        let isWin = isX === true ? 'ttttt' : 'fffff';

        let val1 = ' ';
        let val2 = ' ';
        let val3 = ' ';
        let val4 = ' ';

        let index1;
        let index2;
        let index3;
        let index4;

        index1 = { i: i, j: j - 4 }
        for (let k = j - 4; k <= j + 4; k++) {

            if (boardData[i][k] === true) val1 += 't';
            else if (boardData[i][k] === false) val1 += 'f';
            else val1 += ' ';
        }

        index2 = { i: i - 4, j: j }
        for (let k = i - 4; k <= i + 4; k++) {

            if (boardData[k][j] === true) val2 += 't';
            else if (boardData[k][j] === false) val2 += 'f';
            else val2 += ' ';
        }

        index3 = { i: i - 4, j: j - 4 }
        let k, h;
        for (k = i - 4, h = j - 4; k <= i + 4; k++ , h++) {

            if (boardData[k][h] === true) val3 += 't';
            else if (boardData[k][h] === false) val3 += 'f';
            else val3 += ' ';
        }

        index4 = { i: i + 4, j: j - 4 }
        for (k = i + 4, h = j - 4; k >= i - 4; k-- , h++) {

            if (boardData[k][h] === true) val4 += 't';
            else if (boardData[k][h] === false) val4 += 'f';
            else val4 += ' ';
        }

        val1 += ' ';
        val2 += ' ';
        val3 += ' ';
        val4 += ' ';

        const isWin1 = val1.indexOf(isWin); //horizontal
        const isWin2 = val2.indexOf(isWin); //vertical
        const isWin3 = val3.indexOf(isWin); //top-left to bottom-right
        const isWin4 = val4.indexOf(isWin); //bottom-left -> top-right

        const tmp = this.state.isX === false ? 't' : 'f';
        if (isWin1 > -1) {
            if (val1[isWin1 - 1] !== tmp || val1[isWin1 + 5] !== tmp) {
                index1.j += isWin1 - 1;
                this.props.setWinIndex(index1);
                this.props.setWinType(LeftToRight);
                this.props.setWinner(this.state.isX);
            }
        } else if (isWin2 > -1) {
            if (val2[isWin2 - 1] !== tmp || val2[isWin2 + 5] !== tmp) {
                index2.i += isWin2 - 1;
                this.props.setWinIndex(index2);
                this.props.setWinType(TopToBottom);
                this.props.setWinner(this.state.isX);
            }
        } else if (isWin3 > -1) {
            if (val3[isWin3 - 1] !== tmp || val3[isWin3 + 5] !== tmp) {
                index3.i += isWin3 - 1;
                index3.j += isWin3 - 1;
                this.props.setWinIndex(index3);
                this.props.setWinType(TopLeftToBottomRight);
                this.props.setWinner(this.state.isX);
            }
        } else if (isWin4 > -1) {
            if (val4[isWin4 - 1] !== tmp || val4[isWin4 + 5] !== tmp) {
                index4.i -= isWin4 - 1;
                index4.j += isWin4 - 1;
                this.props.setWinIndex(index4);
                this.props.setWinType(BottomLeftToTopRight);
                this.props.setWinner(this.state.isX);
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

    }

    drawBoard = (width, height, resetBoard) => {

        const board = [];
        let value = this.state.isX === true ? 'x' : 'o';
        board.push(<span key={`${resetBoard}markV`}  className="verticalMark"></span>)
        for (let i = 0; i < height; i++) {
            board.push(<span key={`${resetBoard}markV${i}`} className="verticalMark">{i}</span>)
        }
        for (let i = 0; i < height; i++) {
            board.push(<span className="verticalMark" key={`${resetBoard}markH${i}`}>{String.fromCharCode(i + 65)}</span>)
            for (let j = 0; j < width; j++) {
                const key = i * 20 + j;
                const isWinSquare = this.isWinSquare(i + 5, j + 5);
                board.push(<Square key={`${resetBoard}${key}`} i={i + 5} j={j + 5} value={value} winner={this.props.winner} isWinSquare={isWinSquare} switch={this.switch} />);
            }
        }

        return board;
    }

    render() {

        const { width, height, resetBoard } = this.props;
        return (
            <div key={resetBoard}>
                <div className="Board">
                    {this.drawBoard(width, height, resetBoard)}
                </div>
                <span>Next is: {this.state.isX === true ? 'x' : 'o'}</span>
            </div>
        )
    }
}
export default Board