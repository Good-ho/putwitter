import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Putwitter from "components/Putwiiter";
import PutwiiterFactory from "components/PutwiiterFactory";

const Home = ({ userObj }) => {
  const [putwitter, setPutwitter] = useState([]);

  //   const getPutwitter = async () => {
  //     const data = await dbService.collection("putwitter").get();
  //     data.forEach((document) => {
  //       const puObject = {
  //         ...document.data(),
  //         id: document.id,
  //       };
  //       setPutwitter((prev) => [puObject, ...prev]);
  //     });
  //   };

  useEffect(() => {
    // getPutwitter();
    dbService.collection("putwitter").onSnapshot((snapshot) => {
      const putwitterArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPutwitter(putwitterArray);
    });
  }, []);

  return (
    <div className="container">
      <PutwiiterFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {putwitter &&
          putwitter.map((obj) => (
            <Putwitter
              key={obj.id}
              putwitter={obj}
              isOwner={userObj.uid === obj.creatorId}
            />
          ))}
      </div>
    </div>
  );
};

export default Home;
