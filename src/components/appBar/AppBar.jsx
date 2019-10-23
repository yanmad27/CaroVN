import * as React from 'react';
import history from 'historyConfig';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import * as UserActions from 'reduxs/reducers/user/action';
import './AppBar.scss';

class ButtonAppBar extends React.Component {

  handleClick = (url) => () => {
    history.push(url);
  }

  render() {

    console.log("Appbar is rendering...");
    const { userState, removeToken } = this.props;
    const { token, username } = userState;
    const isLogin = token !== '';
    const { handleClick } = this;

    return (
      <div className="root" >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className="menuButton"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className="title" />
            {isLogin ?
              <>
                <span style={{ marginBottom: '4px' }}>Hello {username}</span>
                <Button onClick={event => { handleClick('signin')(event); removeToken() }} color="inherit">sign out</Button>
              </> :
              <>
                <Button onClick={handleClick('signin')} color="inherit">sign in</Button>
                <Button onClick={handleClick('signup')} color="inherit">sign up</Button>
              </>
            }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userState: state.UserState,
  };
};

const mapDispatchToProps = {
  removeToken: UserActions.RemoveToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonAppBar);