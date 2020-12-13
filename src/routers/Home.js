import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  const [inputText, setInputText] = useState("");
  const [putwitter, setPutwitter] = useState("");

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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("putwitter").add({
      text: inputText,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setInputText("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputText(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={inputText}
          onChange={onChange}
          maxLength={120}
        />
        <input type="submit" value="puTwitter" />
      </form>
      <div>
        {putwitter &&
          putwitter.map((obj) => (
            <div key={obj.id}>
              <h4>{obj.text}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
