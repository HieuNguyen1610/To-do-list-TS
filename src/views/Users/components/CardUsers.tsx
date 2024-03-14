import React from "react";
import { User } from "../ListUser";
import { Navigate } from "react-router-dom";

interface CardUserProps {
  user: User;
}

interface CardUserState {}

class CardUser extends React.Component<CardUserProps, CardUserState> {
  constructor(props: CardUserProps) {
    super(props);
    this.state = {};
  }

  handleOnClick = (user: User) => {
    console.log(user);
  };

  render() {
    const { user } = this.props;
    return (
      <div className="card-container" onClick={() => this.handleOnClick(user)}>
        <div className="card-img">
          <img src={user.avatar} alt={user.first_name} />
        </div>
        <div className="card-content">
          <p>
            {user.first_name} {user.last_name}
          </p>
        </div>
      </div>
    );
  }
}

export default CardUser;
