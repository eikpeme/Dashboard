import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
// layout for this page
import Admin from "layouts/Admin.js";
import axios from 'axios';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import tim from "assets/img/new_logo.png";
import { useRouter } from "next/router";
import MuiAlert from "@material-ui/lab/Alert";
import { getToken} from '../../utility/apihelp';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const styles = {
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
};
export const getServerSideProps =  async() =>{

  const baseUrl = 'https://artizan-api-staged.herokuapp.com';

  const response = await axios.get(`${baseUrl}/users`);
  const data = await response.data;

  return {
    props: { users: data }
  }

}
function UserProfile({users}) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const router = useRouter();
  
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setMessage('You are not authenticated')
      return setTimeout(() => router.push('/admin/login'), 2000)
    };
    
  }, []);

  return (
    <div> 
        {message && (
        <Alert severity="error">
        {message}
        </Alert>
      )}
      <div>
        {users.map(user => (
          <div key={user.id}>
            {user.first_name}
            {user.last_name}
          </div>
        ))}
      </div>

  <GridContainer>
    <TableContainer>
      <Card>
        <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>User Profile Data</h4>
          </CardHeader>
        <CardBody>
        <Table tableHeaderColor="primary" aria-label="simple table">
        <div>
        {users.map(user => (
          <div key={user.id}>
            {user.first_name}
            {user.last_name}
          </div>
        ))}
      </div>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">First-Name</TableCell>
              <TableCell align="right">Second-Name</TableCell>
              <TableCell align="right">Email&nbsp;(g)</TableCell>
              <TableCell align="right">Phone Number&nbsp;(g)</TableCell>
              <TableCell align="right">Location&nbsp;(g)</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map(user => (
              <TableRow key={user.name}>
                <TableCell key={user.id} component="th" scope="row">
                  {user.first_name}
                </TableCell>
                <TableCell key={user.id} component="th" scope="row">
                  {user.last_name}
                </TableCell>
                <TableCell key={user.id} align="right">{user.id}</TableCell>
                <TableCell key={user.email} align="right">{user.email}</TableCell>
                <TableCell key={user.phone_number} align="right">{user.phone_number}</TableCell>
                <TableCell key={user.verification_code} align="right">{user.verification_code}</TableCell>
                <TableCell key={user.id} align="right">
                  <Button aria-label="edit" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
        </CardBody>
        </Card>
      </TableContainer>
    </GridContainer>
      
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
