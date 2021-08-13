import React from "react";
import {Route, Redirect} from "react-router-dom"
import {getToken} from "../utility/apihelp"

function PublicRouter({component: Component, ...rest}) {
    return (
        <Route
        {...rest}
        render={(props) =>  !getToken()? <Component {...rest}/> : <Redirect to={{pathname: 'admin/dashboard', }}/> }
        />
    )
}
export default PublicRouter