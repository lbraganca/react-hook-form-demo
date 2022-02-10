import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import useStyles from "./use-styles";
import items from "./items";

export default function Layout({ children }) {
  const styles = useStyles();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.root}>
      <AppBar className={styles.appBar} elevation={1}>
        <Toolbar>
          <Typography className={styles.welcome}>
            Welcome to Users - {new Date().toLocaleDateString()}
          </Typography>
          <Typography className={styles.profile}>Luís</Typography>
          <Avatar src="./avatar.png" className={styles.avatar} />
        </Toolbar>
      </AppBar>
      <Drawer
        className={styles.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: styles.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={styles.title}>
            Users
          </Typography>
        </div>
        <List>
          {items.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? styles.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={styles.page}>
        <div className={styles.toolbar}></div>
        {children}
      </div>
    </div>
  );
}
