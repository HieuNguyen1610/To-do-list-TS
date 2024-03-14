import React, { ChangeEvent } from "react";
import "./ListToDo.scss";
import AddToDo from "./components/AddToDo";
import { toast } from "react-toastify";

interface Props {
  name?: string;
}

interface State {
  ListToDos: ToDoItem[];
  isEdited: boolean;
  editedItem: ToDoItem;
}

export type ToDoItem = {
  id: string;
  title: string;
};

class ListToDo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      ListToDos: [
        { id: "todo1", title: "Doing homework" },
        { id: "todo2", title: "Playing video game" },
        { id: "todo3", title: "Doing gym" },
      ],
      isEdited: false,
      editedItem: { id: "", title: "" },
    };
  }

  AddFunc = (item: ToDoItem) => {
    this.setState({
      ListToDos: [...this.state.ListToDos, item],
    });
  };

  handleEdit = (item: ToDoItem) => {
    console.log("Edited: ", item);
    this.setState({
      isEdited: true,
      editedItem: item,
    });
  };

  handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let itemCopy = { ...this.state.editedItem };
    itemCopy.title = e.target.value;
    this.setState({
      editedItem: {
        ...itemCopy,
      },
    });
  };

  handleSaveEdit = (editedItem: ToDoItem) => {
    let currentList: ToDoItem[] = [...this.state.ListToDos];
    currentList = currentList.map((item) => {
      if (editedItem.id === item.id) {
        item.title = editedItem.title;
      }
      return item;
    });
    console.log(currentList);

    this.setState({
      ListToDos: [...currentList],
      isEdited: false,
    });
    toast.success("Update successfully");
  };

  handleDelete = (InputItem: ToDoItem) => {
    let NewListToDos = this.state.ListToDos.filter((item) => {
      if (item.id !== InputItem.id) return item;
    });

    this.setState({
      ListToDos: NewListToDos,
    });
    toast.success("Delete successfully!");
  };

  render() {
    const { ListToDos, isEdited, editedItem } = this.state;

    return (
      <div className="list-todo-container">
        <p>{this.props.name}</p>
        <AddToDo AddFunc={this.AddFunc} />
        <div className="list-todo-content">
          {ListToDos &&
            ListToDos.length > 0 &&
            ListToDos.map((item, index) => (
              <div key={item.id} className="todo-child">
                {isEdited === true && editedItem.id === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editedItem.title}
                      onChange={(e) => this.handleOnChange(e)}
                    />
                    <button onClick={() => this.setState({ isEdited: false })}>
                      Cancel
                    </button>
                    <button onClick={() => this.handleSaveEdit(editedItem)}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    <span>
                      {index + 1}-{item.title}
                    </span>
                    <button
                      className="edit-btn"
                      onClick={() => this.handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => this.handleDelete(item)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default ListToDo;
