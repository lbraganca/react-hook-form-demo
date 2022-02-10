import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import useStyles from "./use-styles";

export default function NoteCard({ user, handleDelete }) {
  const styles = useStyles(user);
  const { id, email, role, observation } = user;
  return (
    <Card elevation={1}>
      <CardHeader
        avatar={
          <Avatar className={styles.avatar}>{role[0].toUpperCase()}</Avatar>
        }
        title={email}
        subheader={role}
        action={
          <IconButton onClick={() => handleDelete(id)}>
            <DeleteIcon color="secondary" />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {observation}
        </Typography>
      </CardContent>
    </Card>
  );
}
