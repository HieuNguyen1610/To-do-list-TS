import React from "react";
import CardUser from "./components/CardUsers";
import "./ListUser.scss";
import { fetchAllUsers } from "../../services/UserService";

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

interface ListUserProps {}

interface ListUserState {
  listUser: User[];
}

class ListUser extends React.Component<ListUserProps, ListUserState> {
  constructor(props: ListUserProps) {
    super(props);
    this.state = {
      listUser: [],
    };
  }

  componentDidMount = async () => {
    await fetchAllUsers()
      .then((res) => {
        console.log("List users: ", res.data);
        if (res && res.data) {
          this.setState({
            listUser: [...res?.data],
          });
        }
      })
      .catch((err: any) => {
        console.log("Get users error: ", err);
      });
  };

  render() {
    const { listUser } = this.state;
    console.log("View: ", listUser);

    return (
      <div className="list-user">
        {listUser && listUser.length > 0 ? (
          listUser.map((user) => <CardUser user={user} key={user.id} />)
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default ListUser;
