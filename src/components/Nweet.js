import { dbService,storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { ref, deleteObject } from "firebase/storage";


const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            const NweetTextRef = doc(dbService, "nweet", `${nweetObj.id}`);
            await deleteDoc(NweetTextRef);

            if(nweetObj.attachmentUrl !== ""){
                const deleteRef = ref(storageService, nweetObj.attachmentUrl);
                await deleteObject(deleteRef);
            }
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
                    { 
                        nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} width="50px" height="50px"/>
                    }
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