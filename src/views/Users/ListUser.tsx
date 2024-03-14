import axios from "axios";
import React from "react";
import CardUser from "./components/CardUsers";
import "./ListUser.scss";

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

  componentDidMount = () => {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((res) => {
        this.setState({
          listUser: [...res?.data?.data],
        });
        console.log("Res: ", res);

        console.log("Array when call api", this.state.listUser);

        console.log(typeof this.state.listUser);
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
