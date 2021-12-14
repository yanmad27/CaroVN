/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import { withRouter } from 'react-router'
import * as SocketHandlers from 'reduxs/handlers/socket/index';

import logo from 'shared/images/minilogo.png';

import * as UserActions from 'reduxs/reducers/user/action';

import history from 'historyConfig';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = {
    '@global': {
        body: {
            backgroundColor: "white",
        },
    },
    paper: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '8px'
    },
    submit: {
        marginTop: '16px',
        // marginBottom: '28px',
    },
    signup: {
        color: '#3f51b5',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    }
};

class Main extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount = () => {

        const { userState } = this.props;
        const { token } = userState;

        if (token === '') history.push('/');
    }

    handlePlayOnlineClick = () => {
        const { userState } = this.props;
        const { nickname, username } = userState;

        SocketHandlers.emitFindPlayer(nickname === '' ? username : nickname);
        history.push('/game');
    }

    render() {
        const { classes } = this.props;
        // const { firstLogin } = this.state;
        // const { isSignIn } = userState;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <CardMedia style={{ height: 350 }} component="img" src={logo} />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={this.handlePlayOnlineClick}
                    >
                        CHƠI ONLINE
          </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        CHƠI VỚI MÁY
          </Button>
                </div>
                <Box mt={8}>
                    <Copyright />
                </Box>
            </Container >
        );
    }
}

const mapStateToProps = state => {
    return {
        userState: state.UserState,
    };
};

const mapDispatchToProps = {
    signIn: UserActions.SignIn,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Main)));