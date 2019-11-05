import React from 'react';
import { connect } from 'react-redux';
import MoveHistory from 'components/history/History';
import * as BoardActions from 'reduxs/reducers/board/action';
import * as GameActions from 'reduxs/reducers/game/action';
import * as HistoryActions from 'reduxs/reducers/history/action';
import 'shared/styles/game.scss';
import { withRouter } from 'react-router';
import history from 'historyConfig';
import ChatBox from 'components/chatBox/ChatBox';
import Board from 'components/board/Board';
import * as SocketHandlers from 'reduxs/handlers/socket/index';
import * as SocketActions from 'reduxs/reducers/socket/action';
import Dialog from './dialog/dialog';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
    }
  }

  onPlayAgainClick = () => {
    const { resetBoard, resetWinner, resetMoveHistory } = this.props;

    resetWinner();
    resetBoard();
    resetMoveHistory();
  }

  componentWillMount = () => {

    const { userState } = this.props;
    const { token } = userState;

    if (token === '') history.push('/');
  }

  handleCloseDialog = () => {
    this.setState({
      open: false,
    })
  }

  handleAccept = () => {
    this.setState({
      open: false,
    })
    SocketHandlers.emitFindPlayer();
    SocketHandlers.subcribePairPlayer(this.subcribePairPlayerCallBack);
  }

  subcribePairPlayerCallBack = host => {
    const { joinHost } = this.props;
    joinHost(host);
    console.log('subcribePairPlayerCallBack')

  }

  render() {

    const { open } = this.state;
    console.log("Game is rendering...");

    return (
      <div className="App">
        <Dialog open={open} handleClose={this.handleCloseDialog} handleAccept={this.handleAccept} />
        <span>CARO VN</span>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
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
          <Board width={20} height={20} />
          <ChatBox />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    moveHistory: state.HistoryState.moveHistory,
    userState: state.UserState,
  };
};

const mapDispatchToProps = {
  resetBoard: BoardActions.emitResetBoardDataAction,
  resetWinner: GameActions.emitResetWinnerAction,
  resetMoveHistory: HistoryActions.emitResetMoveHistoryAction,
  joinHost: SocketActions.JoinHost,
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Game));
