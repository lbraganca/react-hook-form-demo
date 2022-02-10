import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import PersonAddIcon from "@material-ui/icons/PersonAdd";

const items = [
  {
    text: "Users",
    icon: <PeopleIcon color="primary" />,
    path: "/",
  },
  {
    text: "Create",
    icon: <PersonAddIcon color="primary" />,
    path: "/user",
  },
];

export default items;
