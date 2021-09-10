// routes for dashboard sidebars
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: Person,
    layout: "/admin",
  },
  {
    path: "/artizans",
    name: "Artizans",
    icon: Person,
    layout: "/admin",
  },
  {
    path: "/service-request",
    name: "Service Request",
    icon: Person,

    layout: "/admin",
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,

    layout: "/admin",
  },
 
 
];

export default dashboardRoutes;
