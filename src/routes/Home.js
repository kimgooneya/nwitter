import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import {v4 as uuidv4} from "uuid";
import {
    collection, 
    query, 
    orderBy,
    onSnapshot,
    addDoc
} from "firebase/firestore";
import Nweet from "components/Nweet";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState ("");
    const [nweets, setNweets] = useState([]);
    const [attachment, setAttachment]=useState();
    useEffect(()=>{
        const q = query(collection(dbService, "nweets"), orderBy("createdAt","desc"));
        onSnapshot(q, (snapshot)=>{
            const nweetArr=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
            console.log(nweets);
        })
    },[])
    const onSubmit= async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment!=""){
            attachmentUrl = await response.ref.getDownloadURL();
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
        }
        const nweetObj = {
            text:nweet,
            createdAt:Date.now(),
            creatorId:userObj.uid,
            attachmentUrl
        }
        await addDoc(collection(dbService,"nweet"), nweetObj);
        setNweet("");
        setAttachment("");
    };
    const onChange = (event) =>{
        const {target:{value}}=event;
        setNweet(value);
    };
    const onFileChange = (event)=>{
        const {target:{files}}=event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onload = (finishedEvent) => {
            const {currentTarget:{result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null);
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                value={nweet} 
                onChange={onChange} 
                text="text" 
                placeholder="What's on your mind?" 
                maxLength={120}/>
                <input type="file" accept="image/*" onChange={onFileChange}/>
                <input type="submit" value="Nweet"/>
                {attachment && 
                <div>
                    <img src={attachment} width="50px" height="50px"/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
                }
            </form>
            <div>
                {nweets.map(nweet => {
                    return(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId==userObj.uid}/>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;