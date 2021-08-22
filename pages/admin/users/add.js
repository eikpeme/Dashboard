import { makeStyles } from "@material-ui/core/styles";
import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import Card from "components/Card/Card.js";
import Container from "@material-ui/core/Container"
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import React from "react";


import 
{ 
Grid,
TextField,
Select,
Button
}
from '@material-ui/core'; 

 
const add = () => {
	const router = useRouter(); 
	const useStyles = makeStyles(styles);
	const classes = useStyles();
	
	return (
		<div>
		  <div className={classes.cardsbodies}></div>
			<Container sm="true">
				<Grid container spacing={3}>
				<Grid item xs={12} sm={12} md={2}></Grid>
					<Grid item xs={12} sm={12} md={8}>
						<Card > 
							<CardHeader color="primary">
								<h4 className={classes.cardTitleWhitew}>Add User</h4>
								<p className={classes.cardCategoryWhitew}>The choice is yours</p>
							</CardHeader>
							<CardBody> 
								<Container sm="true">
									<form autoComplete="email">
										<Grid item xs={12} sm={12} md={12}>
											<Select
												native
												fullWidth
												label="Title"
												inputProps={{
													name: 'age',
													id: 'age-native-simple',
												}}
											>
												<option aria-label="None" value="" />
												<option value={10}>Mr</option>
												<option value={20}>Mrs</option>
												<option value={30}>Miss</option>
												<option value={30}>Ms</option>
											</Select>
											<Select
													native
													fullWidth
													label="Title"
													inputProps={{
														name: 'age',
														id: 'age-native-simple',
													}}
												>
													<option aria-label="None" value="" />
													<option value={10}>User</option>
													<option value={20}>Admin</option>
												
												</Select>
												<TextField 
													fullWidth
													type="text"
													label="First Name"
													color="primary"
													required
												/>
												<TextField 
													fullWidth
													type="text"
													label="Last Name"
													color="primary"
													required
												/>
												<TextField 
													fullWidth
													type="Email"
													label="Email"
													color="primary"
													required
												/>
												<TextField 
													fullWidth
													type="text"
													label="Address"
													color="primary"
													required
												/>
													<TextField 
													fullWidth
													type="number"
													label="Age"
													color="primary"
													required
												/>
												<TextField 
													fullWidth 
													label="Password"
													type="password"
													color="primary"
													required
												/>
												<TextField 
													fullWidth
													type="password"
													label="Confirm Password"
													color="primary"
													required
												/>
												<Button  
													fullWidth 
													type="submit" 
													variant="contained"
													className={classes.button}
												>
													Add
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

 

export default add

