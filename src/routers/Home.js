import React, { useEffect, useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [inputText, setInputText] = useState("");
  const [putwitter, setPutwitter] = useState("");

  const getPutwitter = async () => {
    const data = await dbService.collection("putwitter").get();
    data.forEach((document) => {
      const puObject = {
        ...document.data(),
        id: document.id,
      };
      setPutwitter((prev) => [puObject, ...prev]);
    });
  };

  useEffect(() => {
    getPutwitter();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("putwitter").add({
      inputText,
      createdAt: Date.now(),
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
              <h4>{obj.inputText}</h4>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
