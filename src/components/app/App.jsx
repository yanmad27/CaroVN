import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'components/appBar/AppBar';
import * as BoardActions from 'reduxs/reducers/board/action';
import * as GameActions from 'reduxs/reducers/game/action';
import 'shared/styles/game.scss';

import Board from '../board/Board';

class App extends React.Component {

  onPlayAgainClick = () => {
    const { resetBoard, resetWinner } = this.props;

    resetWinner();
    resetBoard();
  }


  render() {
    const { showNewMoveFirst, resetBoard } = this.props;
    return (
      <div className="App">
        <AppBar />
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
              <span>Next turn is: O</span>
              <button type="button" onClick={this.onPlayAgainClick}>
                Play again
              </button>
            </div>
            <div>
              <span>History</span>
            </div>
            <div
              style={{
                overflow: 'auto',
                maxHeight: 231,
                display: showNewMoveFirst ? 'block' : 'flex',
                flexDirection: 'column-reverse'
              }}
            >
              {/* {this.drawMoveHistory(moveHistory)} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moveHistory: state.HistoryState.moveHistory,
  };
};

const mapDispatchToProps = {
  resetBoard: BoardActions.emitResetBoardDataAction,
  resetWinner: GameActions.emitResetWinnerAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
