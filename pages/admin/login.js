import React from "react";
import GridContainer from "components/Grid/GridContainer.js";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { useRouter } from "next/router";
import CardHeader from "components/Card/CardHeader.js";

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
      fontWeight: "800",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textAlign: "center",
      textDecoration: "none",
    },
    cardHeader: {
        paddingTop: "10em",
    },
    button: {
        marginTop: "14em",
        backgroundColor: "#A95EF9",
        color: "white",
        fontWeight: "800",
        borderRadius: "10px"
    },
    card: {
        paddingBottom: "0.1em",
        marginTop: "2em",
    },
    gridContainer: {
        marginTop: "4em"

    }
  };
  
export default function Login(props){
    const href = "/admin/dashboard"
    const router = useRouter();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    return (
        <div className={classes.gridContainer}>
            <GridContainer>
            <GridItem item xl={1} md={2} sm={1} />
                <GridItem item xl={12} md={8} sm={12}>
                    <Card className={classes.card}>
                        <CardHeader color="primary" className={classes.cardHeader}>
                            <h4 className={classes.cardTitleWhite}>Artizans and Users</h4>
                            <p className={classes.cardCategoryWhite}></p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem item xl={12} md={12} sm={12}>
                                    <TextField 
                                        id="standard-basic"
                                        fullWidth
                                        label="Email"
                                        name="email"
                                        type="email"
                                        required
                                    />
                                </GridItem>
                                <GridItem item xl={12} md={12} sm={12}>
                                    <TextField 
                                        id="standard-basic"
                                        fullWidth 
                                        label="password"
                                        name="password"
                                        type="password"
                                        required
                                    />
                                </GridItem>
                                <GridItem item xl={12} md={12} sm={2} >
                                    <Button 
                                        fullWidth 
                                        type="submit" 
                                        variant="contained"
                                        href="/admin/dashboard"
                                        className={classes.button}
                                        onClick={(e) => e.preventDefault()}
                                        
                                        
                                    >
                                    Log in
                                    </Button>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem item xl={1} md={2} sm={1} />
            </GridContainer>
        </div>
    )
}

