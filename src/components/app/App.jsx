import React from 'react';
import { connect } from 'react-redux';
import SignIn from 'components/signIn/SignIn';
import SignUp from 'components/signUp/SignUp';
import Game from 'components/game/Game';
import {
    Router,
    Switch,
    Route,
} from 'react-router-dom';
import 'shared/styles/game.scss';
import AppBar from 'components/appBar/AppBar';

import history from 'historyConfig';


class App extends React.PureComponent {

    render() {
        return (
            <div >
                <AppBar />
                <Router history={history}>
                    <Switch >
                        <Route exact path="/">
                            <SignIn />
                        </Route>
                        <Route exact path="/signin">
                            <SignIn />
                        </Route>
                        <Route exact path="/signup">
                            <SignUp />
                        </Route>
                        <Route exact path="/game">
                            <Game />
                        </Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     return {
//         moveHistory: state.HistoryState.moveHistory,
//     };
// };

// const mapDispatchToProps = {
// };

export default connect(
    null,
    null
)(App);
