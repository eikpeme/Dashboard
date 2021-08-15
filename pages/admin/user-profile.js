import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "components/Table/Table.js";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Icon from '@material-ui/core/Icon';

import tim from "assets/img/new_logo.png";
import { useRouter } from "next/router";
import MuiAlert from "@material-ui/lab/Alert";
import { getToken} from '../../utility/apihelp';
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
  iconColor: {
    color: "green",
  },
};

function UserProfile() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setMessage('You are not authenticated')
      return setTimeout(() => router.push('/admin/login'), 2000)
    }
    
  }, []);
  return (
    <div>
        {message && (
        <Alert severity="error">
        {message}
        </Alert>
      )}
      <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>User Profile Data</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["ID", "Name", "Email", "Phone Number", "Location", "Passport"]}
                      tableData={[
                        ["1", "Dakota Rice", "dakotarice123@yahoo.com", "09021239832", "Abuja", <img src={tim}/>],
                        ["2", "Minerva Hooper", "minervahoooper@gmail.com", "08123458932", "Lagos", <img src={tim}/>],
                        ["3", "Sage Rodriguez", "sagerodriguez@hotmail.com", "07043245678", "Abuja", <img src={tim}/>],
                        ["4", "Philip Chaney", "philipchaney@gmail.com", "08119929772", "Port Harcourt", <img src={tim}/>],
                        ["5", "Dakota Rice", "dakotarice123@yahoo.com", "09021239832", "Abuja", <img src={tim}/>],
                        ["6", "Minerva Hooper", "minervahoooper@gmail.com", "08123458932", "Lagos", <img src={tim}/>],
                        ["7", "Sage Rodriguez", "sagerodriguez@hotmail.com", "07043245678", "Abuja", <img src={tim}/>],
                        ["8", "Philip Chaney", "philipchaney@gmail.com", "08119929772", "Port Harcourt", <img src={tim}/>],
                      ]}
                    />
                  </CardBody>
              </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
              <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Active Users</h4>
                  </CardHeader>
                  <CardBody>
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["ID", "", "Name", "Email", "Phone Number", "Location", "Passport"]}
                      tableData={[
                        ["1", <Icon className={classes.iconColor}>fiber_manual_record</Icon>, "Dakota Rice", "dakotarice123@yahoo.com", "09021239832", "Abuja", <img src={tim}/>],
                        ["2", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Minerva Hooper", "minervahoooper@gmail.com", "08123458932", "Lagos", <img src={tim}/>],
                        ["3", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Sage Rodriguez", "sagerodriguez@hotmail.com", "07043245678", "Abuja", <img src={tim}/>],
                        ["4", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Philip Chaney", "philipchaney@gmail.com", "08119929772", "Port Harcourt", <img src={tim}/>],
                        ["5", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Dakota Rice", "dakotarice123@yahoo.com", "09021239832", "Abuja", <img src={tim}/>],
                        ["6", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Minerva Hooper", "minervahoooper@gmail.com", "08123458932", "Lagos", <img src={tim}/>],
                        ["7", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Sage Rodriguez", "sagerodriguez@hotmail.com", "07043245678", "Abuja", <img src={tim}/>],
                        ["8", <Icon className={classes.iconColor}>fiber_manual_record</Icon>,"Philip Chaney", "philipchaney@gmail.com", "08119929772", "Port Harcourt", <img src={tim}/>],
                      ]}
                    />
                  </CardBody>
              </Card>
          </GridItem>
      </GridContainer>
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
