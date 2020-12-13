import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import Putwitter from "components/Putwiiter";

const Home = ({ userObj }) => {
  const [inputText, setInputText] = useState("");
  const [putwitter, setPutwitter] = useState([]);
  const [attachment, setAttachment] = useState("");

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

    let attachmentURL = "";

    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentURL = await response.ref.getDownloadURL();
    }

    const putwitterObj = {
      text: inputText,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentURL,
    };
    await dbService.collection("putwitter").add(putwitterObj);
    setInputText("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setInputText(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;

      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearPhoto = () => {
    setAttachment(null);
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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="puTwitter" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearPhoto}>Cancel Upload</button>
          </div>
        )}
      </form>
      <div>
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
