import React from "react"
import { Route, Redirect } from "react-router-dom"
import { getToken } from "../utility/apihelp"

// handle the private route here 

function PrivateRouter({component: Component, ...rest}) {
    return (
        <Route 
            {...rest}
            render={(props) =>  getToken()? <Component {...rest}/> : <Redirect to={{pathname: '/admin/login', state: { from: props.location}}}/>}
        />
    )
}
export default PrivateRouter