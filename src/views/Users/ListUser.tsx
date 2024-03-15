import React from "react";
import CardUser from "./components/CardUsers";
import "./ListUser.scss";
import { fetchAllUsers } from "../../services/UserService";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

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
  pageCount: number;
  pageNumber: number;
}

class ListUser extends React.Component<ListUserProps, ListUserState> {
  constructor(props: ListUserProps) {
    super(props);
    this.state = {
      listUser: [],
      pageCount: 1,
      pageNumber: 1,
    };
  }

  getAllUsers = async (pageNumber: number) => {
    await fetchAllUsers(pageNumber)
      .then((res) => {
        console.log("List users: ", res);
        if (res && res.data.data) {
          this.setState({
            listUser: [...res?.data?.data],
            pageCount: res?.data?.total_pages,
            pageNumber: pageNumber + 1,
          });
        }
      })
      .catch((err: any) => {
        console.log("Get users error: ", err);
      });
  };

  componentDidMount = async () => {
    await this.getAllUsers(this.state.pageNumber);
  };

  handlePageClick = (pageNumber: any) => {
    console.log("Page number: ", pageNumber.selected);
    this.getAllUsers(pageNumber.selected + 1);
  };

  render() {
    const { listUser, pageCount } = this.state;
    console.log("View: ", listUser);

    return (
      <>
        <div className="list-user">
          {listUser && listUser.length > 0 ? (
            listUser.map((user) => <CardUser user={user} key={user.id} />)
          ) : (
            <p>Loading</p>
          )}
        </div>
        <div className="pagination-container">
          <ReactPaginate
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
            onPageChange={(pageNumber: Object) =>
              this.handlePageClick(pageNumber)
            }
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }
}

export default ListUser;
