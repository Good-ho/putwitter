import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
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
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          onChange={onChange}
          value={profileValue}
        />
        <input type="submit" value="Update profile" />
      </form>
      <button onClick={onLogoutClick}>Log out</button>
    </>
  );
};

export default Profile;
