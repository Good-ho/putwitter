import React, { useState } from "react";

const Home = () => {
  const [putwitter, setPutwitter] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
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
