import React, { ChangeEvent } from "react";
import { ToDoItem } from "../ListToDo";
import { toast } from "react-toastify";

interface Props {
  AddFunc: (item: ToDoItem) => void;
}

interface State {
  title: string;
}

class AddToDo extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleAdd = () => {
    if (!this.state.title) {
      toast.error("Missing title");
      return;
    }
    let item: ToDoItem = {
      id: String(Math.floor(Math.random() * 10001)),
      title: this.state.title,
    };
    this.props.AddFunc(item);
    this.setState({
      title: "",
    });
    toast.success("Add successfully!");
  };

  render() {
    const { title } = this.state;

    return (
      <>
        <div className="add-todo">
          <input
            type="text"
            value={title}
            onChange={(event) => this.handleChange(event)}
          />
          <button className="add-btn" type="button" onClick={this.handleAdd}>
            Add
          </button>
        </div>
      </>
    );
  }
}

export default AddToDo;
