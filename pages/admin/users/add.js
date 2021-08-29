import { makeStyles, useTheme } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
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
function getStyles(id, personName, theme) {
	return {
	  fontWeight:
		personName.indexOf(id) === -1
		  ? theme.typography.fontWeightRegular
		  : theme.typography.fontWeightMedium,
	};
}  

export const getStaticProps = async () => {

	const category_idBaseApi =  'https://artizan-api-staged.herokuapp.com'
  
	const response = await axios.get(`${category_idBaseApi}/categories`);
	const data = await response.data;
  
	return {
	  props: { ids: data }
	}
  
  }

 
const add = ({ids}) => {
	const router = useRouter(); 
	const theme = useTheme();
  const [personName, setPersonName] = useState([]);
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const classess = useStyless();
	const [loading, setLoading] = useState()
	const [error, setError] = useState('')
	const [suc, setSuccess] = useState('')
	const first_name = useFormInput('')
	const last_name = useFormInput('')
	const email = useFormInput('')
	const phone_number = useFormInput('')
	const certifications = useFormInput('')
	const rating = useFormInput('')
	const address = useFormInput('')
	const password = useFormInput('')
	const category_id = useFormInput('')
	const lat = useFormInput('')
	const long = useFormInput('')
	const short_description = useFormInput('')

	const handleChange = (event) => {
		setPersonName(event.target.value);
	  };


	const handleCreateAtizans = async(e) => {
		e.preventDefault()

		const artizan = {
			first_name: first_name.value,
			last_name: last_name.value,
			email: email.value,
			phone_number: phone_number.value,
			certifications: certifications.value,
			rating: rating.value,
			address: address.value,
			category_id: category_id.value,
			geo_location: {
				coordinates: [ parseInt(long.value), parseInt(lat.value) ]
			},
			password: password.value,
			short_description: short_description.value
		}
		setError(null)
		setLoading(true)

		const creatAtizanApi = 'https://artizan-api-staged.herokuapp.com/artizans/create';
		try {
			await axios.post(creatAtizanApi, artizan)
			setLoading(false)
				setSuccess('Artizan added successfully')
			    return setTimeout(() => router.push('/admin/dashboard'), 2000)
			
		} catch (error) {
			setLoading(false)
			return	setError('Something went wrong, please try again')
			
		}
	

		
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
									<form onSubmit={handleCreateAtizans} autoComplete="email">
										<Grid item xs={12} sm={12} md={12} className={classes.formControl}>
											<InputLabel id="demo-mutiple-name-label">Category Id</InputLabel>
											<FormControl className={classes.formControl}>
												<Select
													labelId="demo-mutiple-name-label"
													id="demo-mutiple-name"
													input={<Input/>}
													multiple
													{...category_id} 
													value={personName}
													onChange={handleChange}
													MenuProps={MenuProps}
													>
													{ids.map((id) => (
													<MenuItem 
														key={id} 
														value={id._id}
														style={getStyles(id,personName, theme)}
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
												{...first_name}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Last Name"
												color="primary"
												required
												{...last_name}
											/>
											<TextField 
												fullWidth
												type="Email"
												label="Email"
												color="primary"
												required
											{...email}
											/>
										
												<TextField 
												fullWidth
												type="text"
												label="Phone Number"
												color="primary"
												required
												{...phone_number}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Address"
												color="primary"
												required
											{...address}
											/>
											
											<TextField 
												fullWidth
												type="number"
												label="Rating"
												color="primary"
												required
												{...rating}
												
											/>
											<TextField 
												fullWidth
												type="text"
												label="Long"
												color="primary"
											
											{...long}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Lat"
												color="primary"
												required
												{...lat}
											/>
											<TextField 
												fullWidth 
												label="Password"
												type="password"
												color="primary"
												required
												{...password}
											/>
											<TextField
												fullWidth
												color="primary"
												label="Short Description"
												{...short_description}
												required
											/>
											<TextField 
												fullWidth
												type="text"
												label="Certificate Description"
												color="primary"
												required
												{...certifications}
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
												{!loading && 'Add Artizan'}
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

const useFormInput = initialValue => {
	const [value, setValue] = useState(initialValue)

	const handleChange = (e) => {
		setValue(e.target.value)
	}
	return {
		value,
		onChange: handleChange
	}
} 

 
export default add

