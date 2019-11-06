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
import ResultDialog from './dialog/ResultDialog';
import TieDialog from './dialog/TieDialog';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      ispared: false,
      turn: '',
      dialogopen: false,
      result: '',
      tieDialogOpen: false,
    }
    SocketHandlers.subcribePairPlayer(this.subcribePairPlayerCallBack);
    SocketHandlers.subcribeHaveWinner(this.subcribesubcribeHaveWinnerCallBack);
    SocketHandlers.subcribeRequireTie(this.subcribeRequireTieCallBack);
  }

  subcribePairPlayerCallBack = host => {
    const { joinHost } = this.props;
    const turn = host === SocketHandlers.getSocketID() ? 'trước' : 'sau';
    joinHost(host);
    console.log('subcribePairPlayerCallBack')
    this.setState({
      ispared: true,
      turn
    })
    setTimeout(() => {
      this.setState({
        open: false,
      })
    }, 1000);

  }

  subcribesubcribeHaveWinnerCallBack = data => {

    const { host } = data;
    const socketid = SocketHandlers.getSocketID();

    let result = 'thua';
    if (socketid === host) {
      result = 'thắng';
    }
    this.setState({
      dialogopen: true,
      result,
    })

  }

  subcribeRequireTieCallBack = () => {

    this.setState({
      tieDialogOpen: true,
    })


  }

  onPlayAgainClick = () => {
    const { resetBoard, resetWinner, resetMoveHistory } = this.props;

    resetWinner();
    resetBoard();
    resetMoveHistory();
  }

  componentDidMount = () => {

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
  }

  playagain = () => {

  }

  quit = () => {

  }

  requireTieClick = () => {

    SocketHandlers.emitRequireTie();
  }


  render() {

    const { open, ispared, turn, dialogopen, result } = this.state;
    const { tieDialogOpen } = this.state;
    console.log("Game is rendering...");

    return (
      <div className="App">
        <Dialog open={open} ispared={ispared} turn={turn} />
        <ResultDialog open={dialogopen} result={result} playagain={this.playagain} quit={this.quit} />
        <TieDialog open={tieDialogOpen} />

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
              <button type="button" onClick={this.requireTieClick}>
                Xin hòa
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
