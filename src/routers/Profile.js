import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
  const [profileValue, setProfileValue] = useState(userObj.displayName);
  const history = useHistory();

  const onLogoutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyPutwitter = async () => {
    const putwitter = await dbService
      .collection("putwitter")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();

    // console.log(putwitter.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyPutwitter();
  });

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setProfileValue(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (userObj.displayName !== profileValue) {
      await userObj.updateProfile({
        displayName: profileValue,
      });
      refreshUser();
    }
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          autoFocus
          value={profileValue}
          className="formInput"
        />
        <input
          type="submit"
          value="Update profile"
          className="formBtn"
          style={{
            marginTop: 10,
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogoutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
