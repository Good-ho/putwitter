import React, { useState } from "react";
import { dbService, storageService } from "fbase";

const Putwitter = ({ putwitter, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newPutwitter, setNewPutwitter] = useState(putwitter.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("Are you sure you want to delete this one?");
    if (ok === true) {
      // delete
      await dbService.doc(`putwitter/${putwitter.id}`).delete();
      await storageService.refFromURL(putwitter.attachmentURL).delete();
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewPutwitter(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService
      .doc(`putwitter/${putwitter.id}`)
      .update({ text: newPutwitter });

    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="input edit text"
              value={newPutwitter}
              required
              onChange={onChange}
            />
            <input type="submit" value="Edit Update" />
          </form>
          <button onClick={toggleEditing}>cancel</button>
        </>
      ) : (
        <>
          <h4>{putwitter.text}</h4>
          {putwitter.attachmentURL && (
            <img src={putwitter.attachmentURL} width="50px" height="50px" />
          )}
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEditing}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Putwitter;
