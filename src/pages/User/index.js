import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Container,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  LinearProgress,
} from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import { Alert } from "@material-ui/lab";
import { useForm } from "react-hook-form";
import useStyles from "./use-styles";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Create() {
  const styles = useStyles();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // const emailRef = React.createRef();

  // useEffect(() => emailRef.current.focus(), [emailRef]); // Replaced with autoFocus

  const validateEmail = async (value) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_HOST}/users`
      );
      const data = await response.json();
      await sleep(3000);
      setIsLoading(false);
      return data.some((user) => user.email === value)
        ? "Email already exists"
        : null;
    } catch (error) {
      setIsLoading(false);
      return "Service unavailable";
    }
  };

  const onSubmit = async ({ email, role, observation }) => {
    try {
      await fetch(`${process.env.REACT_APP_SERVER_HOST}/users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, role, observation }),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Typography
        variant="h6"
        component="h2"
        color="textSecondary"
        gutterBottom
      >
        Create a New User
      </Typography>

      <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <FormControl className={styles.field}>
          <TextField
            autoFocus
            required
            fullWidth
            variant="outlined"
            label="Email"
            placeholder="email@example.com"
            {...register("email", {
              validate: validateEmail,
              required: "This field is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
          />
          {isLoading && <LinearProgress />}
          {errors.email && (
            <Alert severity="error">{errors.email.message}</Alert>
          )}
        </FormControl>

        <FormControl required variant="outlined" className={styles.field}>
          <InputLabel>Role</InputLabel>
          <Select
            label="Role"
            fullWidth
            defaultValue={""}
            {...register("role", { required: "This field is required" })}
          >
            <MenuItem value={"admin"}>Administrator</MenuItem>
            <MenuItem value={"user"}>User</MenuItem>
            <MenuItem value={"guest"}>Guest</MenuItem>
          </Select>
          {errors.role && <Alert severity="error">{errors.role.message}</Alert>}
        </FormControl>

        <FormControl className={styles.field}>
          <TextField
            label="Observation"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            {...register("observation", {
              maxLength: {
                value: 255,
                message: "Max length is 255",
              },
            })}
          />
          {errors.observation && (
            <Alert severity="error">{errors.observation.message}</Alert>
          )}
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          endIcon={<SaveIcon />}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}
