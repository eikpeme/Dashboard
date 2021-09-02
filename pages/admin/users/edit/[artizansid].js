                       
import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import Admin from "layouts/Admin.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import React, {useState, useEffect} from "react";
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
	Select,
	MenuItem,
	Input,
	FormControl,
	InputLabel
}
from '@material-ui/core'; 

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
 
export const getStaticPaths = async() => {
	return {
		paths: [
			{
				params: { artizansid: ''},
				
			},
		],
		fallback: false
	}
}
const   baseUrl =  'https://artizan-api-staged.herokuapp.com'

export const getStaticProps = async () => {
	const response = await axios.get(`${baseUrl}/categories`);
	const data = await response.data;
	return {
	  props: { ids: data, }
	}
  
  }

 
const edit = ({ids}) => {
	const router = useRouter(); 
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const classess = useStyless();
	const [loading, setLoading] = useState()
	const [error, setError] = useState('')
	const [suc, setSuccess] = useState('')
	
	const [artizans, setAtizans] = useState({
		first_name: '',
		last_name: '',
		email: '',
		phone_number: '',
		certifications: '',
		rating: '',
		address: '',
		password: '',
		category_id: '',
		short_description: '',
		geo_location: {
			coordinates: [ parseInt(long), parseInt(lat) ]
		},
	});

	const {
		first_name, 
		last_name,
		email,
		phone_number, 
		certifications,
		rating,
		address,
		password,
		short_description,
		category_id, 
		long,
		lat,
	} = artizans;

	const onInputChange = e => {
		setAtizans({...artizans, [e.target.name]: e.target.value});

	};

	useEffect(() => {
		loadArtizans()
	}, []);

	const handleEditAtizans = async(e) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		try {
			await axios.put(`${baseUrl}/artizans/update/${artizansid}`, artizans)
			setLoading(false)
			setSuccess('Artizan edited successfully')
			return setTimeout(() => router.push('/admin/artizans-profile'), 2000)
		} catch (error) {
			setLoading(false)
			if(error.response.status === 401 || error.response.status === 400) setError(error.response.data.message);
			else {
				setError('Something went wrong, please try again')
			}
		}
	};
	
	const loadArtizans = async e => {
			const result = await axios.get(`${baseUrl}/artizans/${artizansid}`)
			setAtizans(result.data);
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
								<h4 className={classes.cardTitleWhitew}>Add Artizans</h4>
								<p className={classes.cardCategoryWhitew}>The choice is yours</p>
							</CardHeader>
							<CardBody> 
								<Container sm="true">
									<form onSubmit={handleEditAtizans} autoComplete="email">
										<Grid item xs={12} sm={12} md={12} className={classes.formControl}>
											<InputLabel id="demo-mutiple-name-label">Category Id</InputLabel>
											<FormControl className={classes.formControl}>
												<Select
													labelId="demo-mutiple-name-label"
													id="demo-mutiple-name"
													multiple
													input={<Input />}
													MenuProps={MenuProps}
													name="category_id"
													value={category_id}
													onChange={e => onInputChange(e)}
													>
													{ids.map((id) => (
													<MenuItem 
														key={id}
														value={id}
													>
													{id._id}
													</MenuItem> 
												))}
												
												</Select>
											</FormControl>
											<TextField 
												fullWidth 
												type="text"
												label="First Name"
												color="primary"
												required
												name="first_name"
												value={first_name}
												onChange={e => onInputChange(e)}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Last Name"
												color="primary"
												required
												name="last_name"
												value={last_name}
												onChange={e => onInputChange(e)}
											/>
											<TextField 
												fullWidth
												type="Email"
												label="Email"
												color="primary"
												required
												name="email"
												value={email}
												onChange={e => onInputChange(e)}
											/>
										
											<TextField 
												fullWidth
												type="text"
												label="Phone Number"
												color="primary"
												required
												name="phone_number"
												value={phone_number}
												onChange={e => onInputChange(e)}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Address"
												color="primary"
												required
												name="address"
												value={address}
												onChange={e => onInputChange(e)}
											/>
											
											<TextField 
												fullWidth
												type="number"
												label="Rating"
												color="primary"
												required
												name="rating"
												value={rating}
												onChange={e => onInputChange(e)}
												
											/>
											<TextField 
												fullWidth
												type="text"
												label="Long"
												color="primary"
												name="long"
												value={long}
												onChange={e => onInputChange(e)}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Lat"
												color="primary"
												required
												name="lat"
												value={lat}
												onChange={e => onInputChange(e)}
											/>
											<TextField 
												fullWidth 
												label="Password"
												type="password"
												color="primary"
												required
												name="password"
												value={password}
												onChange={e => onInputChange(e)}
											/>
											<TextField
												fullWidth
												color="primary"
												label="Short Description"
												name="short_description"
												value={short_description}
												onChange={e => onInputChange(e)}
												required
											/>
											<TextField 
												fullWidth
												type="text"
												label="Certificate Description"
												color="primary"
												required
												name="certifications"
												value={certifications}
												onChange={e => onInputChange(e)}
											/>
							
											<div>Upload your certificate</div>
											<TextField
											fullWidth
												accept="image/*"
												className={classess.input}
												id="contained-button-file"
												multiple
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
												{!loading && 'Edit Artizan'}
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

edit.layout = Admin;
export default edit

