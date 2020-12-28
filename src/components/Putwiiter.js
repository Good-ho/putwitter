import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="input edit text"
              value={newPutwitter}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" value="Edit Update" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
        </>
      ) : (
        <>
          <h4>{putwitter.text}</h4>
          {putwitter.attachmentURL && <img src={putwitter.attachmentURL} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Putwitter;
