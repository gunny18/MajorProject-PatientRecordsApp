import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUsers, fetchUsers, selectAllUsers } from "./usersSlice";
import { getAuthState, refreshAccessToken } from "../auth/authSlice";

const Users = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();

  const auth = useSelector(getAuthState);

  useEffect(() => {
    let isMounted = true;
    const getUsers = async () => {
      try {
        isMounted &&
          users == null &&
          (await dispatch(
            fetchUsers({ accessToken: auth.accessToken })
          ).unwrap());
      } catch (error) {
        dispatch(clearUsers());
        const errMsg = JSON.parse(error?.message);
        console.log(errMsg);
        console.log("Auth state before refresh---->", auth);
        dispatch(refreshAccessToken());
      }
    };
    getUsers();

    return () => {
      isMounted = false;
    };
  }, [auth, dispatch, users]);

  const usersList = users?.length ? (
    users.map((user) => <li key={user._id}>{user.username}</li>)
  ) : (
    <p>No users to display</p>
  );

  return (
    <section>
      <h1>Users</h1>
      {usersList}
    </section>
  );
};

export default Users;
