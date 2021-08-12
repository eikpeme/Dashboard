import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Grid  from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import {useState, useContext} from 'react'
import { useRouter } from "next/router";
import axios from 'axios'
import UserContext from "../utility/useContext"
import { setUserSession } from '../utility/apihelp';

 
const Login = () => {
	const router = useRouter(); 
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('')
	const [suc, setSuccess] = useState('')
	const [loading, setLoading] = useState(false)
	const {dispatch } = useContext(UserContext);
    
    

const handleSubmit = (e) => {
	e.preventDefault();
	const loginParams = {
		email: email,
		password: password,
	}
	setLoading(true)
	axios.post('https://artizan-api-staged.herokuapp.com/auth/admin/login', loginParams
	).then(response => {
		setLoading(false)
		setSuccess('Success')
		setUserSession(response.data.token, response.data.user )
		return setTimeout(() => router.push('/admin/dashboard'), 1000);
	}).catch(err => {
		setLoading(true)
		if(err.response.status === 401 || err.response.status === 400) {
			setError('Something went wrong, please try again');
		}
		else {
			setError('Something went wrong, please try again')
		}
	}) 
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
									<form onSubmit={handleSubmit} autoComplete="off">
										<Grid item xs={12} sm={12} md={12}>
											<TextField 
												fullWidth 
												label="Email"
												id="email"
												type="email"
												color="primary"
												required
												value={email}
												onChange={(e) => setEmail(e.target.value)}
											/>
											<TextField 
												fullWidth
												id="password"
												type="password"
												value={password}
												onChange={(e) => setPassword( e.target.value)}
												label="Password"
												color="primary"
												required
											/>
											<div className={classes.error}>{error}</div>
										  <Button  
												fullWidth 
												type="submit" 
												variant="contained"
												value={loading? "Loading...": "Login"}
												className={classes.button}
												isDisabled={loading}
											>
											 Login
										  </Button>
										</Grid>
									</form>
								</Container>
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

