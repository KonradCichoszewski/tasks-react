import React from 'react';
import axios from 'axios';
import './Task.css';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            done: this.props.todo.done
        }

        this.toggleDone = this.toggleDone.bind(this);
    }

    toggleDone(id) {
        axios.patch("http://localhost:3000/todos/" + id, {}, {
            headers: {
                authorization: this.props.token
            }
        }).then(res => {
            if (res.status == 200) {
                this.setState({ done: !this.state.done });
            }
        }).catch(err => {
            console.error(err.message);
        })
    }

    render() {
        return (
            <div className="task">
                <p className={`text ${this.state.done.toString()}`} onClick={() => this.toggleDone(this.props.todo.id)}>{this.props.todo.todo}</p>
                <img src="http://www.clker.com/cliparts/D/0/R/b/X/W/red-cross-md.png" className="x" onClick={() => this.props.delete(this.props.todo.id)}/>
            </div>
        )
    }
}

export default Task;