import React from 'react';
import { connect } from 'react-redux';
import MoveHistory from 'components/history/History';
import * as BoardActions from 'reduxs/reducers/board/action';
import * as GameActions from 'reduxs/reducers/game/action';
import * as HistoryActions from 'reduxs/reducers/history/action';
import 'shared/styles/game.scss';
import { withRouter } from 'react-router';
import Board from '../board/Board';

class Game extends React.Component {

  onPlayAgainClick = () => {
    const { resetBoard, resetWinner, resetMoveHistory } = this.props;

    resetWinner();
    resetBoard();
    resetMoveHistory();
  }

  render() {
    console.log("Game is rendering...");
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
          <Board width={20} height={20} />
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
            <MoveHistory />
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
  resetMoveHistory: HistoryActions.emitResetMoveHistoryAction,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Game));
