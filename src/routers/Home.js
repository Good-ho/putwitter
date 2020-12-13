import React, { useState } from "react";
import { dbService } from "fbase";

const Home = () => {
  const [putwitter, setPutwitter] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("putwitter").add({
      putwitter,
      createdAt: Date.now(),
    });
    setPutwitter("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setPutwitter(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          value={putwitter}
          onChange={onChange}
          maxLength={120}
        />
        <input type="submit" value="puTwitter" />
      </form>
    </div>
  );
};

export default Home;
