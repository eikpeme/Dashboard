import React, { useEffect, useState} from "react";
import Users from '../pages/admin/user-profile';
import axios from 'axios';

export default function UserProfile(props) {
    const [userData, setUserData] = useState('')
 
    const baseUrl = 'https://artizan-api-staged.herokuapp.com'

    useEffect(() => {

        getUsersData()

    },[]); 

const getUsersData = () =>{
 axios.get(`${baseUrl}/users`).then((response) => {
     const allUsersData = response.data.userData.allUsersData
     setUserData(allUsersData);
 })
   .catch((error) => console.error(`Error: ${error}`));
   return (
       <Users userData={userData}/>
   )
    }
}
