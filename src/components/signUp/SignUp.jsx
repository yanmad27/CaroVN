/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import history from 'historyConfig';
import * as UserActions from 'reduxs/reducers/user/action';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

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
            backgroundColor: 'white',
        },
    },
    paper: {
        marginTop: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: '8px',
        backgroundColor: 'white',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: '8px',
    },
    submit: {
        marginTop: '16px',
        marginBottom: '28px',
    },
    signin: {
        color: '#3f51b5',
        '&:hover': {
            cursor: 'pointer',
            textDecoration: 'underline',
        }
    }
}

class SignUp extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    handleFormSubmition = (event) => {
        event.preventDefault();
        const { signUp } = this.props;
        const { username, password } = this.state;
        if (username.length < 6 || password.length < 6) {
            return;
        }
        
        signUp(username, password);

    }

    render() {
        const { classes } = this.props;
        return (
            <Container component="main" maxWidth="xs" >
                <CssBaseline />
                <div className={classes.paper}>
                    <div>
                        <Typography component="h1" variant="h5">
                            Sign up
        </Typography>
                        <form className={classes.form} onSubmit={this.handleFormSubmition}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="fname"
                                        name="firstName"
                                        variant="outlined"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="lname"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        onChange={event => { this.setState({ username: event.target.value }) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        onChange={event => { this.setState({ password: event.target.value }) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="passwordAgain"
                                        label="Password Again"
                                        type="password"
                                        id="passwordAgain"
                                        autoComplete="current-password"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
          </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <span className={classes.signin} onKeyPress={() => { }} onClick={() => { history.push('/signin') }} variant="body2">
                                        Already have an account? Sign in
              </span>
                                </Grid>
                            </Grid>
                        </form>
                    </div >
                </div>
                <Box mt={5}>
                    <Copyright />
                </Box>
            </Container>
        );
    }
}


const mapStateToProps = state => {
    return {
        userState: state.UserState,
    };
};

const mapDispatchToProps = {
    signUp: UserActions.SignUp,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp)));