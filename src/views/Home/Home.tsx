import React from "react";
import { connect } from "react-redux";

interface HomeProps {
  dataRedux: [];
  addUser: () => void;
  deleteUser: (user: any) => void;
}

interface HomeState {}

class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {};
  }

  handleAddUser = () => {
    this.props.addUser();
  };

  handleDeleteUser(user: any) {
    console.log("Click delete: ", user);
    this.props.deleteUser(user);
  }

  render() {
    const { dataRedux } = this.props;
    console.log(this.props);

    return (
      <>
        <div>Home Page</div>
        <h2>List of users redux</h2>
        <button type="button" onClick={() => this.handleAddUser()}>
          Add random user
        </button>
        {dataRedux ? (
          dataRedux.map((usr: any) => (
            <p key={usr.id}>
              {usr.name}
              <span onClick={() => this.handleDeleteUser(usr)}> x </span>
            </p>
          ))
        ) : (
          <>Loading...</>
        )}
      </>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    //dataRedux's just a variable name
    dataRedux: state.users,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteUser: (userDelete: any) =>
      dispatch({ type: "DELETE_USER", payload: userDelete }),
    addUser: () => dispatch({ type: "ADD_USER" }),
  };
};

// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
