import React, { useState } from "react";
import { dbService } from "fbase";
import {addDoc,collection} from "firebase/firestore";

const Home = () => {
    const [nweet, setNweet] = useState ("");
    const onSubmit= async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(dbService,"nweets"),{
                nweet,
                createdAt:Date.now()
            }
            );
            console.log("Documents written with ID:",docRef.id);
        } catch (error) {
            console.log("Error adding documents:",error);
        }
        setNweet("");
    };
    const onChange = (event) =>{
        const {target:{value}}=event;
        setNweet(value);
    };
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} text="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="Nweet"/>
            </form>
        </div>
    );
};

export default Home;