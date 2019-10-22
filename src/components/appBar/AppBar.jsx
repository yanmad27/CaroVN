import * as React from 'react';
import history from 'historyConfig';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './AppBar.scss';

export default function ButtonAppBar() {
  console.log("Appbar is rendering...");
  const handleClick = (url) => () => {
    history.push(url);
  }
  return (
    <div className="root">
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
          <Button onClick={handleClick('signin')} color="inherit">sign in</Button>
          <Button onClick={handleClick('signup')} color="inherit">sign up</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
