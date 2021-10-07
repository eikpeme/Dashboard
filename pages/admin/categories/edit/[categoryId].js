import { makeStyles} from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import Admin from "layouts/Admin.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import React, {useState} from "react";
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
}
from '@material-ui/core'; 
import { authAxios } from "../../../../utility/apihelp";

 
export const getInitialProps = async() => {
    const response = await authAxios.get(`/categories`);
    const data = response.data;
    const paths = data.map(category => {
        return {
            params: {
                categoryId: `${category._id}`
            },
			
        }
    })
	return {
		paths,
		fallback: false
	}
    
}




export const getServerSideProps = async ({params: {categoryId}}) => {
	const res = await authAxios.get(`/categories/${categoryId}`);
    const artisansData = res.data;
	return {
	  props: { artisansData}
	}
  }

const add = ({ artisansData}) => {
	console.log(artisansData)
	const router = useRouter(); 
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	const [loading, setLoading] = useState()
	const [error, setError] = useState('')
	const [success, setSuccess] = useState('')


	const [category, setUser] = useState({
		
		active: artisansData.active,
		name: artisansData.name,
		image_url: artisansData.image_url
	});

	const { 
		active,
    name,
		image_url,
	} = category

	const handleCreateUsers = async(e) => {
		e.preventDefault()
		setError(null)
		setLoading(true)
		
		
		try {
			const requestBody = {
				active: category.active,
				name: category.name,
				image_url: category.image_url,
				
			}
				await authAxios.put(`/categories/${artisansData._id}`, requestBody)
				setLoading(false)
				setSuccess('Artizan Edited Successfully')
				return router.push(`/admin/categoery`);
		} catch (error) {
				setLoading(false)
				if(error.response.status === 401 || error.response.status === 400) setError(error.response.data.message)
			else{
				setError('Something went wrong, please try again')
			}
		}
		
	}
	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setUser({...category, [name]: value})
	}
	return (
		<div>
			{success && (
				<Alert severity="success">
				{success}
				</Alert>
			)}
		  <div className={classes.cardsbodies}></div>
			<Container sm="true">
				<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={2}></Grid>
					<Grid item xs={12} sm={12} md={8}>
						<Card > 
							<CardHeader color="primary">
								<h4 className={classes.cardTitleWhitew}>Edit Category</h4>
								<p className={classes.cardCategoryWhitew}>The choice is yours</p>
							</CardHeader>
							<CardBody> 
								<Container sm="true">
									<form onSubmit={handleCreateUsers} autoComplete="email">
										<Grid item xs={12} sm={12} md={12} className={classes.formControl}>
										<TextField 
												fullWidth
												type="text"
												label="Name"
												color="primary"
												name="name"
												value={name}
												onChange={handleInputChange}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Avatar"
												color="primary"
												name="image_url"
												value={image_url}
												onChange={handleInputChange}
											/>
											<TextField 
												fullWidth
												type="text"
												label="Activeness"
												color="primary"
												name="active"
												value={active}
												onChange={handleInputChange}
											/>
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



