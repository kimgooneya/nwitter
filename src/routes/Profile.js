import React, {useEffect} from "react";
import { authService, dbService } from "fbase";
import { useHistory } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const Profile = ({userObj}) => {
    console.log(userObj);
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

        querySnapshot.forEach(doc => {
           console.log(doc.id,"=>",doc.data());
        })
    };
    useEffect(()=>{
        getMyNweet();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
       <>
            <button onClick={onLogOutClick}>Log Out</button>
       </>
    );
};

export default Profile;