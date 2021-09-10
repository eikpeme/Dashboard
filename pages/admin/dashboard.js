import React, { useEffect, useState } from "react";


// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Info from "@material-ui/icons/Info";
import Check from "@material-ui/icons/Check";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";
import Link from "next/link"
import { useRouter } from "next/router";
import { bugs, pending, resolved } from "variables/general.js";


import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

import { getToken} from '../../utility/apihelp';

function Dashboard() {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [message, setMessage] = useState('');
 
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
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="warning">
                <Icon> <Accessibility /> </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Users </p>
              <h3 className={classes.cardTitle}>
                21
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <Accessibility />
                </Danger>
                <Link href="/admin/user-profile">
                  <a  onClick={(e) => e.preventDefault()}>
                    View Users
                  </a>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="dark">
              <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Artizans</p>
              <h3 className={classes.cardTitle}>1</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <Accessibility />
                </Danger>
                <a href="/artizans-profile" onClick={(e) => e.preventDefault()}>
                  View Artizans
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="dark">
              <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Service Requests</p>
              <h3 className={classes.cardTitle}>0</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <Accessibility />
                </Danger>
                <a href="/artizans-profile" onClick={(e) => e.preventDefault()}>
                  View Service Requests
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
       
        <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Users:"
            headerColor="dark"
            tabs={[
              {
                tabName: "A/D",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Activated",
                tabIcon: Info,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={pending}
                  />
                ),
              },
              {
                tabName: "Deactivated",
                tabIcon: Check,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={resolved}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Artizans:"
            headerColor="dark"
            tabs={[
              {
                tabName: "A/D",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Activated", 
                tabIcon: Info,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={pending}
                  />
                ),
              },
              {
                tabName: "Deactivated",
                tabIcon: Check,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={resolved}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  );
}

Dashboard.layout = Admin;

export default Dashboard;
