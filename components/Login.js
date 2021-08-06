import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid  from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import {useState, useContext} from 'react'
import { useRouter } from "next/router";
import UserContext from "../utility/useContext"
import { post } from '../utility/apihelp';
const Login = () => {
    const router = useRouter(); 
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const {dispatch } = useContext(UserContext);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const loginParams = {
            email: email,
            password: password,
            method: 'POST',
            baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth/admin/login`
        } 
       
            const apiResponse = await post(loginParams, '/api/login',  );
            if (apiResponse === 'success') {
                dispatch({type: 'login'})
                return setTimeout(() => router.push('/admin/dashboard'), 1000);
                
            }
            window.location.reload('')
            setError('')
            
            return setError('invalid credential')
     }
    return (
        <div>
            <div className={classes.cardsbodies}></div>
            <Container sm="true">
                <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={2}></Grid>
                    <Grid item xs={12} sm={12} md={8}>
                        <Card >
                            <CardHeader color="primary">
                                <h4 className={classes.cardTitleWhitew}>Welcome Back</h4>
                                <p className={classes.cardCategoryWhitew}>Great to have you back</p>
                            </CardHeader>
                            <CardBody>
                                <Container sm="true">
                                    <form onSubmit={handleSubmit}>
                                        <Grid item xs={12} sm={12} md={12}>
                                            <TextField 
                                                fullWidth 
                                                label="Email"
                                                id="email"
                                                type="email"
                                                color="primary"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <TextField 
                                                fullWidth
                                                id="password"
                                                type="password"
                                                onChange={(e) => setPassword( e.target.vaue)}
                                                label="Password"
                                                color="primary"
                                                required
                                            
                                            />
                                            <Button  
                                                fullWidth 
                                                type="submit" 
                                                variant="contained"
                                                className={classes.button}
                                            >
                                                log In
                                            </Button>
                                        </Grid>
                                    </form>
                                </Container>
                                <h2 className="error">{error}</h2>
                            </CardBody>
                        </Card>
                    </Grid>
                <Grid item xs={12} sm={12} md={2}></Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default Login

  