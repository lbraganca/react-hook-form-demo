import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import Masonry from "react-masonry-css";
import UserCard from "../../components/UserCard";
import useStyles from "./use-styles";

export default function Users() {
  const styles = useStyles();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_HOST}/users`
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`${process.env.REACT_APP_SERVER_HOST}/users/${id}`, {
      method: "DELETE",
    });
    setUsers(users.filter((user) => user.id !== id));
  };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className={styles.masonry}
        columnClassName={styles.masonryColumn}
      >
        {users.map((user) => (
          <div className={styles.masonryItem} key={user.id}>
            <UserCard user={user} handleDelete={handleDelete} />
          </div>
        ))}
      </Masonry>
    </Container>
  );
}
