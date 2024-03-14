import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../ListUser";

function DetailUser() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`https://reqres.in/api/users/${id}`)
        .then((res) => {
          setUser(res?.data?.data);
        })
        .catch((err) => {
          console.log("Detail user error: ", err);
        });
    }, 1500);
  }, [user]);

  return (
    <div>
      <h2>Detail Information</h2>
      {user ? (
        <>
          <img src={user?.avatar} alt={user?.first_name} />
          <p>First name: {user?.first_name}</p>
          <p>Last name: {user?.last_name}</p>
          <p>Contact: {user?.email}</p>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default DetailUser;
