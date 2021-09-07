import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import Admin from "layouts/Admin.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import React, {useState} from "react";
import axios from 'axios'
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const useStyless = makeStyles((theme) => ({
	formControl: {
	margin: theme.spacing(1),
	minWidth: 120,
	maxWidth: 300,
	},
	chips: {
	display: 'flex',
	flexWrap: 'wrap',
	},
	chip: {
	margin: 2,
	},
	noLabel: {
	marginTop: theme.spacing(3),
	},
	table: {
		minWidth: 700,
    },
	cardCategoryWhite: {
		color: "rgba(255,255,255,.62)",
		margin: "0",
		fontSize: "14px",
		marginTop: "0",
		marginBottom: "0",
	
	},
	cardTitleWhite: {
		color: "#FFFFFF",
		marginTop: "0px",
		minHeight: "auto",
		fontWeight: "500",
		fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
		marginBottom: "3px",
		textDecoration: "none",
		textAlign: "center",
	},
	searchWrapper: {
		textAlign: "center",
		marginBottom: "2em"
	},
		input: {
		display: "none"
	},
	button: {
		color: 'purple',
		margin: 10
	},
	secondaryButton: {
		color: "gray",
		margin: 10
	},
	
})); 


import 
{ 
	Grid,
	TextField,
	Button,
	CircularProgress,
	Fab,
}
from '@material-ui/core'; 

 
export const getStaticPaths = async() => {
    const response = await axios.get(`${baseUrl}/artizans`);
    const data = await response.data;
    const paths = data.map(artid => {
        return {
            params: {
                artizansid: `${artid._id}`
            }
        }
    })
	return {
		paths,
		fallback: false
	}
}

const baseUrl =  'https://artizan-api-staged.herokuapp.com'

export const getStaticProps = async ({params: {artizansid}}) => {
	const res = await axios.get(`${baseUrl}/artizans/${artizansid}`);
    const artisansData = await res.data;
	return {
	  props: {  artisansData }
	}
  }

const add = ({ artisansData}) => {
	const router = useRouter(); 
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const classess = useStyless();
	const [loading, setLoading] = useState()
	const [error, setError] = useState('')
	const [suc, setSuccess] = useState('')


	const [artizan, setAtizans] = useState({
		update_data: {
			last_name: artisansData.last_name
		},
		email: artisansData.email,
	});

	const { 
		email,
		last_name
	} = artizan

	const handleCreateAtizans = async(e) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		
		
		try {
			const requestBody = {
				email,
				update_data: { last_name: artizan.update_data}
			}
				console.log(artizan)
				await axios.put(`${baseUrl}/artizans/update`, requestBody)
				setLoading(false)
				setSuccess('Artizan added successfully')
				return setTimeout(() => router.push(`/admin/artizans-profile`), 2000)
		} catch (error) {
				setLoading(false)
				setError('Something went wrong, please try again')
		}
		
	}
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setAtizans({...artizan, [name]: value})
	}
	return (
		<div>
			{suc && (
				<Alert severity="success">
				{suc}
				</Alert>
			)}
		  <div className={classes.cardsbodies}></div>
			<Container sm="true">
				<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={2}></Grid>
					<Grid item xs={12} sm={12} md={8}>
						<Card > 
							<CardHeader color="primary">
								<h4 className={classes.cardTitleWhitew}>Edit Artizans</h4>
								<p className={classes.cardCategoryWhitew}>The choice is yours</p>
							</CardHeader>
							<CardBody> 
								<Container sm="true">
									<form onSubmit={handleCreateAtizans} autoComplete="email">
										<Grid item xs={12} sm={12} md={12} className={classes.formControl}>
											<TextField 
												fullWidth
												type="text"
												label="Last Name"
												color="primary"
												required
												name="update_data"
												value={last_name}
												onChange={handleInputChange}
											/>
											<TextField 
												fullWidth
												type="Email"
												label="Email"
												color="primary"
												required
												name="email"
											    value={email}
												onChange={handleInputChange}
											/>
											
											<div>Upload your certificate</div>
											<TextField
											    fullWidth
												accept="image/*"
												className={classess.input}
												id="contained-button-file"
												label=""
												type="file"
											/>
											<label htmlFor="contained-button-file">
												<Fab component="span" className={classess.button}>
														<AddPhotoAlternateIcon />
												</Fab>
											</label>
											<Button
												fullWidth 
												type="submit" 
												variant="contained"
												className={classes.button}
												disabled={loading}
											>
												{loading && <CircularProgress size={16} />}
												{!loading && 'Submit Changes'}
											</Button> 
											{error && (
												<Alert severity="error">
													{error}
												</Alert>
											)}
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

add.layout = Admin;
export default add



