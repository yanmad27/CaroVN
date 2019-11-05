/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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

class Profile extends React.PureComponent {

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

  componentWillMount = () => {

    const { userState } = this.props;
    const { token } = userState;

    if (token === '') history.push('/');
  }

  render() {
    const { classes, userState } = this.props;
    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <div>
            <Typography component="h1" variant="h5">
              Profile
        </Typography>
            <Avatar alt="Remy Sharp" src="reduxs/components/editprofile/logo512.png" className={classes.bigAvatar} />
            <form className={classes.form} onSubmit={this.handleFormSubmition}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <TextField
                    autoComplete="fname"
                    name="nickname"
                    variant="outlined"
                    fullWidth
                    id="nickname"
                    label="Nick Name"
                    autoFocus
                    defaultValue={userState.nickname}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    disabled
                    value={userState.username}
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
                Save
          </Button>
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
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(Profile)));