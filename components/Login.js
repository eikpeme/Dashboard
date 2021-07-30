import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid  from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import {useState} from 'react'

const Login = (props) => {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
    
    return (
        <div>
            <Container sm={true}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhitew}>Welcome Back</h4>
                        <p className={classes.cardCategoryWhitew}>Great to have you back</p>
                    </CardHeader>
                    <CardBody>
                        <Container sm={true}>
                            <Grid xs={12} sm={12} md={12} >
                                <TextField 
                                    fullWidth 
                                    label="Email" 
                                    id="email"
                                    type="email"
                                    color="primary"
                                    required
                                    
                                />
                                <TextField 
                                    fullWidth 
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    onChange={handleChange('password')}
                                    label="Password"
                                    color="primary"
                                    required
                                />
                                <Button  
                                    fullWidth 
                                    type="submit" 
                                    variant="contained"
                                    href="/admin/dashboard"
                                    className={classes.button}
                                    onClick={(e) => e.preventDefault()}
                                >
                                Log in
                                </Button> 
                            </Grid>
                        </Container>
                    </CardBody>
                </Card>
            </Container>
           
        </div>
    )
}

export default Login
