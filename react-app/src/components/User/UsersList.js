import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getUser } from "../../store/user";
import Footer from "../Footer";
import UserCard from "../UserCard";
import './User.css'

function UsersList() {
  const dispatch = useDispatch()
  const users = useSelector((state) => Object.values(state.users))
  const [loaded, setLoaded] = useState(false)
  

  console.log(users)

  useEffect( () => {
   dispatch(getUser())
   setLoaded(true)
  }, []);

 

  return (
    <>
    <div className='user-container'>  
    {loaded && (
      <>
      {users.map((user) => (
        <>
          <UserCard user={user} />
        </>
      ))}
      </>
    )}
    </div>
    <Footer />
    </>
  );
}

export default UsersList;