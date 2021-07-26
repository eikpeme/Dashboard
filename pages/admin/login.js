import React from 'react'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Image from 'assets/img/sidebar-1.jpg';
import 'assets/css/styles.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));


const login = () => {
    const classes = useStyles();
    return (
        <div>
            <Container maxWidth="">
                <Grid container spacing={2}>
                    <Grid container item xs={6} spacing={2}>
                        <Grid item xs={6}>
                                {/* <img src={Image}/> */}
                        </Grid>
                    </Grid>
                    <Grid container item xs={6} spacing={2}>
                        <Grid className="form-block" item md={6}>
                            <h2>Let's sign you in</h2>
                            <span>Welcome back, You've been missed</span>
                            <form>
                                <Grid item xl={12} md={12}>
                                    <TextField id="standard-basic"
                                        fullWidth
                                        label="Email"
                                        name="email"
                                    />
                                </Grid>
                                <Grid item xl={12} md={12} sm={12}>
                                    <TextField id="standard-basic"
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                    />
                                    <span>Forgot Password?</span>
                                </Grid>
                                <Grid item xl={12} md={12} sm={12}>
                                    <Button color="secondary" fullWidth type="submit" variant="contained">
                                        Log in
                                    </Button>
                                </Grid>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default login
