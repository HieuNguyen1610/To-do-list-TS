import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../ListUser";
import { fetchUser } from "../../../services/UserService";

function DetailUser() {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    setTimeout(async () => {
      await fetchUser(id)
        .then((res) => {
          if (res && res.data) {
            setUser(res?.data);
          }
        })
        .catch((err) => {
          console.log("Get user error: ", err);
        });
    }, 1000);
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
