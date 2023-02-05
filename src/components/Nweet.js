import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        console.log(ok)
        if (ok) {
            const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
            await deleteDoc(NweetTextRef);
        }
    }
    const toggleEditing = () => {
        setEditing((prev) => !prev);
    }
    const onSubmit = async (event)=>{
        event.preventDefault();
        const NweetTextRef = doc(dbService, "nweets", `${nweetObj.id}`);
        await updateDoc(NweetTextRef, {text:newNweet});
        toggleEditing();
    }
    const onChange= (event)=>{
        const {target:{value}}=event;
        setNewNweet(value);
    }
    return (
        <div>
            {editing ? (<>
                {isOwner && <><form onSubmit={onSubmit}>
                    <input 
                    type="text" 
                    placeholder="Edit your nweet" 
                    value={newNweet} 
                    required 
                    onChange={onChange}
                    />
                    <input type="submit" value="Update Nweet"/>
                </form>
                <button onClick={toggleEditing}>Cancle</button></>
                }
            </>
            ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {isOwner &&(
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default Nweet;