
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
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { useRouter } from "next/router";
import styles from "assets/jss/nextjs-material-dashboard/components/tasksStyle.js";
import logo from "assets/img/favicon.svg";

import 
{ 
	Grid,
	TextField,
	Button,
	CircularProgress,
	Fab,
}
from '@material-ui/core'; 


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
  input: {
    display: "none"
},
button: {
    color: 'purple',
    margin: 10
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
        permanent: false,
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
  const classess = useStyless();
  const router = useRouter();
 
  return (
    <div>
      <Card>
        <CardHeader color="primary">
          <h4 className={classess.cardTitleWhite}>Artizan Details</h4>
        </CardHeader>
        <CardBody>
        <div> artizan Avata</div>
        <label htmlFor="contained-button-file">
            <Fab component="span" className={classess.button}>
                    <AddPhotoAlternateIcon 
                        logo={logo}
                     />
                </Fab>
            </label>
        </CardBody>
      </Card>
    </div>
  );
}

ArtizanProfiles.layout = Admin;

export default ArtizanProfiles;