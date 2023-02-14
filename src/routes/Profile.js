import React, {useEffect, useState} from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

const Profile = ({userObj}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweet = async () =>{
        const q = query(collection(dbService, "nweet"), 
        where("creatorId", "==", userObj.uid),
        orderBy("createdAt", "asc"));
        
        const querySnapshot = await getDocs(q);
    };
    useEffect(()=>{
        getMyNweet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    const onChange = (event)=>{
        const {
            target: {value},
        }=event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) =>{
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await updateProfile(userObj, {displayName: newDisplayName});
        }
    }
    return(
       <>
       <form onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            type="text" 
            placeholder="Display name"
            value={newDisplayName}
            />
            <input type="submit" value="Update Profile"/>
       </form>
            <button onClick={onLogOutClick}>Log Out</button>
       </>
    );
};

export default Profile;