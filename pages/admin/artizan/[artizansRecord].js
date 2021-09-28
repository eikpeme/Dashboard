import React from "react";
// @material-ui/core components
import { withStyles, makeStyles } from "@material-ui/core/styles";

// layout for this page
import Admin from "layouts/Admin.js";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CardBody from "components/Card/CardBody.js";
import {
  
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Table,
  Fab,
}
  from '@material-ui/core';
import { authAxios } from "../../../utility/apihelp";

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
    cursor: 'pointer'
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
  button: {
		color: 'purple',
		marginBottom: '2em'
	}
  
}); 

export const getInitialProps = async() => {
  const response = await authAxios.get(`/admins/artizans`);
  const data = response.data;
  const paths = data.map(artid => {
    return {
      params: {
        artizansRecord: `${artid._id}`
      },
    }
  })
  return {
    paths,
    fallback: false
  }
}



export const getServerSideProps = async ({params: {artizansRecord}}) => {
  const res = await authAxios.get(`/admins/artizans/${artizansRecord}`);
  const data = res.data;
  return {
    props: { user: data}
  }
}

function ArtizanProfiles({ user }) {
  const classess = useStyless();
  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Artizans Details</h4>

        </CardHeader>
        <CardBody>
          <div>Artizan Avata</div>
        <label htmlFor="contained-button-file">
          <Fab component="span" className={classess.button}>
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
          <TableContainer component={Paper}>
            <Table className={classess.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">First Name</StyledTableCell>
                  <StyledTableCell align="right">Last Name</StyledTableCell>
                  <StyledTableCell align="right">Email Address</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Category ID</StyledTableCell>
                  <StyledTableCell align="right">Description</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Certifications</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow className={classess.data} key={user._id} >
                  <StyledTableCell  align="right">
                    {user.first_name}
                  </StyledTableCell>
                  <StyledTableCell  align="right">
                    {user.last_name}
                  </StyledTableCell>
                  <StyledTableCell  align="right">
                    {user.email}
                  </StyledTableCell>
                  <StyledTableCell  align="right">
                    {user.phone_number}
                  </StyledTableCell>
                  <StyledTableCell  align="right">
                    {user.category_id}
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
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardBody>
      </Card>
    </div>
  );
}

ArtizanProfiles.layout = Admin;

export default ArtizanProfiles;