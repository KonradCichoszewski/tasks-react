import React from "react";
import axios from "axios";
import "./Task.css";

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      done: this.props.task.done,
    };

    this.toggleDone = this.toggleDone.bind(this);
  }

  toggleDone(task_id) {
    axios
      .patch(
        "http://localhost:3000/tasks/" + task_id,
        {},
        {
          headers: {
            authorization: this.props.token,
          },
        }
      )
      .then((res) => {
        if (res.status == 200) {
          this.setState({ done: !this.state.done });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  tryDelete(task_id) {}

  render() {
    return (
      <div className="task">
        <p
          className={`task_text task_${this.state.done.toString()}`}
          onClick={() => this.toggleDone(this.props.task.id)}
        >
          {this.props.task.task}
        </p>
        <img
          src="http://www.clker.com/cliparts/D/0/R/b/X/W/red-cross-md.png"
          className="task_x"
          onClick={() =>
            this.props.delete(this.props.token, this.props.task.id)
          }
        />
      </div>
    );
  }
}

export default Task;
