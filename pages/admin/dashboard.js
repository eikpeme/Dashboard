import React, { useEffect, useState} from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Accessibility from "@material-ui/icons/Accessibility";
import PanToolIcon from '@material-ui/icons/PanTool';
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
import { getToken, authAxios} from '../../utility/apihelp';
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";
import MuiAlert from "@material-ui/lab/Alert";


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export  const getServerSideProps = async() => {
  const response = await authAxios.get(`/admins/users`);
  const resbody =  response.data;

  // const res = await authAxios.get(`/artizans`);
	// const data = res.data;

  // const services = await authAxios.get(`/service_requests`);
  // const serviceRequest = services.data;

  // const category = await authAxios.get(`/categories`);
  // const categoryBody = category.data;

  if(!resbody){
    return{
      redirect: {
        destination: 'admin/login',
        permanent: false,
      }
    }
  }
   return{
    props: {
      users: resbody,
      // artizans: data,
      // serviceRequests: serviceRequest,
      // categoryBodies: categoryBody,
    }
   }
}
function Dashboard({ users, artizans, serviceRequests, categoryBodies }) {
  const router = useRouter();
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [message, setMessage] = useState('');
 
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setMessage('You are not authenticated')
      return  router.push('/admin/login')
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
        <GridItem xs={12} sm={3} md={3}>
          <Card> 
            <CardHeader color="primary" stats icon>
              <CardIcon color="dark">
                <Icon> <Accessibility /> </Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Total Users </p>
              <h3 className={classes.cardTitle}>
              <div>
                {users.length}
							</div>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <Accessibility />
                </Danger>
                <Link href="/admin/user-profile">
                  <a  onClick={(e) => e.preventDefault()}>
                    USERS
                  </a>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={3} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="dark">
              <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Artizans</p>
              <h3 className={classes.cardTitle}>
                <div></div>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <Accessibility />
                </Danger>
                <a href="/artizans-profile" onClick={(e) => e.preventDefault()}>
                  ARTIZANS
                </a>
              </div>
            </CardFooter>
          </Card>
          
        </GridItem>
        <GridItem xs={12} sm={3} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="dark">
              <PanToolIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Total Categories</p>
              <h3 className={classes.cardTitle}>
                {/* <div>{categoryBodies.length}</div> */}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <PanToolIcon />
                </Danger>
                <a href="/artizans-profile" onClick={(e) => e.preventDefault()}>
                  CATEGORIES
                </a>
              </div>
            </CardFooter>
          </Card>
          
        </GridItem>
        <GridItem xs={12} sm={3} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="dark">
              <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Total Requests</p>
              {/* <h3 className={classes.cardTitle}>{serviceRequests.length}</h3> */}
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                <Accessibility />
                </Danger>
                <a href="/artizans-profile" onClick={(e) => e.preventDefault()}>
                SERVICE REQUESTS
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
