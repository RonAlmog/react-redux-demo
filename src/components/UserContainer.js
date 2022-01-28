import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../redux";

function UserContainer({ userData, fetchUsers }) {
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  const [newUserName, setNewUserName] = useState("ron");
  const saveNewUser = (userName) => {
    console.log("new user: ", userName);
  };

  return (
    <Fragment>
      <div>
        <h2>Add User</h2>
        <input
          type="text"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <button onClick={() => saveNewUser(newUserName)}>Add new user</button>
        {newUserName}
      </div>
      {userData.loading ? (
        <h2>Loading</h2>
      ) : userData.error ? (
        <h2>{userData.error}</h2>
      ) : (
        <div>
          <h2>User List</h2>
          <button onClick={fetchUsers}>Fetch Users</button>
          {userData &&
            userData.users &&
            userData.users.map((user) => <p>{user.name}</p>)}
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer);
