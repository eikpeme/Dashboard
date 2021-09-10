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
import Link from "next/link";
import styles from "assets/jss/nextjs-material-dashboard/components/tasksStyle.js";
import MuiAlert from "@material-ui/lab/Alert";
import { getToken } from '../../utility/apihelp';
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close"; 
import {
  TextField,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Table,
  CircularProgress,
  Button
}
  from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderBottom: theme.palette.common.black,
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

const useStyless = makeStyles({
  table: {
    minWidth: 700,
    borderBottom: '1px solid purple',
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginBottom: "0",
    marginTop: "0",
   
  },
  data: {
    borderBottom: '1px solid purple',
  },
  buttt: {
    backgroundColor: 'purple',
    marginBottom: '1em',
    color: 'white',
    fontWeight: "600",
    "&:hover,&:focus" : {
      color: 'purple',
      backgroundColor: 'gray',
      fontWeight: "800",
    }
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
    marginBottom: "2em",
  },
  
}); 
const baseUrl = 'https://artizan-api-staged.herokuapp.com';

export async function getServerSideProps(context) {
  const response = await axios.get(`${baseUrl}/artizans`);
  const data = await response.data;
    
  if(!data){
    return {
      redirect: {
        destination: '/',
        parmanent: false,
      }
    }
  }

  return {
    props: {
       users: data,
        revalidate: 10, 
      }
    
  }
}

function ArtizanProfiles({ users }) {
  
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const classess = useStyless();
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');
	const [suc, setSuccess] = useState('');
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setMessage('You are not authenticated')
      return setTimeout(() => router.push('/admin/login'), 2000)
    };

  }, []);
  


  const deleteArtizan = async(artizansid) => {
    if(
      window.confirm(`Are you sure you wanna delete this Artizan?`)
    ) {
      const res = await axios.delete(`${baseUrl}/artizans/${artizansid}`)
     
     await res.data
      if(res.status === 200){
        setSuccess(`You have successfully deleted this Artizan`)

        return setTimeout(() => router.push(`/admin/artizans`), 2000)

      }else{
        setError('Oops! Something Went wrong.')
      }
    }
    
  }

  return (
    <div>
      {message && (
        <Alert severity="error"  >
          {message}
        </Alert>
      )}
       { suc && (
        <Alert severity="success"  >
          {suc}
        </Alert>
      )}

      <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Artizans</h4>

        </CardHeader>
        <CardBody>
          <div className={classess.searchWrapper}>
            <TextField
              type="Search"
              placeholder="Search"
              onChange={
                (e) => {setSearch(e.target.value)}
              }
            />
          </div>
          <Link href="/admin/users/add" className={classes.edit}>
          <Button className={classess.buttt}>Add Artizans</Button>
        </Link>
          <TableContainer component={Paper}>
            <Table className={classess.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                <StyledTableCell align="right">No.</StyledTableCell>
                  <StyledTableCell align="right">Full Name</StyledTableCell>
                  <StyledTableCell align="right">Email Address</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Certifications</StyledTableCell>
                  <StyledTableCell align="right">Edit</StyledTableCell>
                  <StyledTableCell align="right">Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.filter((user) => {
                    if (search === "") {
                      return user
                    } else if (user.first_name) {
                      return user
                    }
                  })
                  .map((user, index) => {
                    return (
                      
                      <StyledTableRow className={classess.data} key={user._id} >
                         <StyledTableCell align="right">
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell  align="right">
                          {user.first_name + '  '  +  user.last_name}
                        </StyledTableCell>
                        <StyledTableCell  align="right">
                          {user.email}
                        </StyledTableCell>
                        <StyledTableCell  align="right">
                          {user.phone_number}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {user.short_description}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {user.address}
                        </StyledTableCell>
                        <StyledTableCell  align="right">
                          {user.certifications}
                        </StyledTableCell>
                        <StyledTableCell  align="right">
                        <Link href={`/admin/users/edit/${user._id}`} className={classes.edit}>
                          <Tooltip
                            id="tooltip-top"
                            title="Edit Artizan"
                            placement="top"
                            classes={{ tooltip: classes.tooltip }}
                          >
                            <IconButton
                              aria-label="Edit"
                              className={classes.tableActionButton}
                            >
                              <Edit
                                className={
                                  classes.tableActionButtonIcon + " " + classes.edit
                                }
                              />
                              </IconButton>
                          </Tooltip>
                          </Link>
                        </StyledTableCell>
                        <StyledTableCell  align="right">
                          <div onClick={()=> deleteArtizan(user.email)} className={classes.delete} >
                              {user.isDeleting 
                                ? <span className={classes.editing}></span>
                                : <span>
                                  <Tooltip
                                    id="tooltip-top-start"
                                    title="Delete Artizan"
                                    placement="top"
                                    classes={{ tooltip: classes.tooltip }}
                                  >
                                    <IconButton
                                      aria-label="Close"
                                      className={classes.tableActionButton}
                                    >
                                      <Close
                                        className={
                                          classes.tableActionButtonIcon + "  " + classes.close
                                        }
                                      />
                                    </IconButton>
                                  </Tooltip>
                                </span>
                              }
                          </div> 
                        </StyledTableCell>
                        
                      </StyledTableRow>
                    )
                  })
                }
                { !users &&
                <StyledTableRow>
                <StyledTableCell key={user.sizes} component="th" scope="row">
                  <CircularProgress size={16}/>
                </StyledTableCell> 
                </StyledTableRow>
                }
                {users && !users.length &&
                  <StyledTableCell key={user.notFound} component="th" scope="row">
                    <p>No Users To Found</p>
                  </StyledTableCell>
               }
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}
    </div>
  );
}

ArtizanProfiles.layout = Admin;

export default ArtizanProfiles;