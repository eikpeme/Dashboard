import React, { useEffect, useState } from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";

// layout for this page
import Admin from "layouts/Admin.js";
import axios from 'axios';
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import MuiAlert from "@material-ui/lab/Alert";
import { getToken } from '../../utility/apihelp';
import {
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table

}
  from '@material-ui/core';
// modal import 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Grid } from "@material-ui/core";
import { CardFooter } from "reactstrap";



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles({
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
  button: {
    backGround: "linear-gradient(60deg, #ab47bc, #8e24aa",
  }
});


export const getServerSideProps = async () => {

  const baseUrl = 'https://artizan-api-staged.herokuapp.com';

  const response = await axios.get(`${baseUrl}/users`);
  const data = await response.data;

  return {
    props: { users: data }
  }

}
function UserProfile({ users }) {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();

  // modal state 
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


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

      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>User Profile Data</h4>

        </CardHeader>
        <CardBody>
          <div className={classes.searchWrapper}>
            <TextField
              type="serach"
              placeholder="Serach"
              onChange={
                (e) => setSearch(e.target.value)
              }
            />
          </div>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Verification Code</StyledTableCell>
                  <StyledTableCell align="right">First Name</StyledTableCell>
                  <StyledTableCell align="right">Last Name</StyledTableCell>
                  <StyledTableCell align="right">Email Address</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .filter((user) => {
                    if (search === "") {
                      return user
                    } else if (user.first_name) {
                      return user
                    }
                  })
                  .map((user) => {
                    return (
                      <StyledTableRow onClick={handleClickOpen}>
                        <StyledTableCell key={user.id} component="th" scope="row">
                          {user.verification_code}
                        </StyledTableCell>
                        <StyledTableCell key={user.first_name} align="right">
                          {user.first_name}
                        </StyledTableCell>
                        <StyledTableCell key={user.last_name} align="right">
                          {user.last_name}
                        </StyledTableCell>
                        <StyledTableCell key={user.email} align="right">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell key={user.phone_number} align="right">
                          {user.phone_number}
                        </StyledTableCell>
                      </StyledTableRow>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
      <Card>
        {/* form modal  */}
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <CardHeader color="primary">
            <DialogTitle className={classes.cardTitleWhite} id="form-dialog-title">Edit User Profile</DialogTitle>
          </CardHeader>
          <CardBody>
            <DialogContent>
              <DialogContentText>
                Kindly fill in the correct informations
              </DialogContentText>
              <form >
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    id="firstname"
                    label="First Name"
                    type="name"
                    fullWidth
                  />

                  <TextField
                    variant="outlined"
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    variant="outlined"
                    autoFocus
                    margin="dense"
                    id="phone"
                    label="phone"
                    type="text"
                    fullWidth
                  />
                </Grid>
              </form>
            </DialogContent>
          </CardBody>
          <CardFooter>
            <DialogActions>
              <Button
                color="primary"
                fullWidth
                type="submit"
                variant="contained"
                onClick={handleClose}
              >
                Done
              </Button>
            </DialogActions>
          </CardFooter>

        </Dialog>
      </Card>
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
