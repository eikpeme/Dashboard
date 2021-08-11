import React from "react";
import Router from "next/router";
import axios from "axios";
axios.defaults.baseUrl = 'https://artizan-api-staged.herokuapp.com';

export default function Index() {
  React.useEffect(() => {
    Router.push("/admin/login");
  });

  return <div />;
}

