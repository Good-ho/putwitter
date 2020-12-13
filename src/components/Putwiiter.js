import React from "react";

const Putwitter = ({ putwitter, isOwner }) => {
  return (
    <div>
      <h4>{putwitter.text}</h4>
      {isOwner && (
        <>
          <button>Delete</button>
          <button>Edit</button>
        </>
      )}
    </div>
  );
};

export default Putwitter;
