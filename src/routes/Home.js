import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import {
    collection, 
    query, 
    orderBy,
    onSnapshot,
} from "firebase/firestore";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    
    const [nweets, setNweets] = useState([]);
    
    useEffect(()=>{
        const q = query(collection(dbService, "nweet"), orderBy("createdAt","desc"));
        onSnapshot(q, (snapshot)=>{
            const nweetArr=snapshot.docs.map((doc)=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArr);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    return(
        <div>
            <NweetFactory userObj={userObj}/>
            <div>
                {nweets.map(nweet => {
                    return(
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId===userObj.uid}/>
                    );
                })}
            </div>
        </div>
    );
};

export default Home;