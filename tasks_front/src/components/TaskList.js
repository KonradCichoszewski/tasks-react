import './TaskList.css';
import React from 'react';
import Task from './Task.js';
import { connect } from 'react-redux';
import { tryAddingTask } from '../redux/actions/tasksActions';

class TaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.tryAdding = this.tryAdding.bind(this);
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    tryAdding(e) {
        if (e.keyCode == 13 && this.state.text.length) {
        this.props.tryAddingTask(this.props.token, e.target.value, this.props.currentList.id);
        this.setState({ ...this.state, text: ""});
        }
    }

    render() {
        let optionalMessage = <p></p>;
        if (!this.props.loggedIn) {
            optionalMessage = <p className="new_task_message">Log in or sign up in order to add new tasks</p>
        }

        let title = () => {
            if (this.props.currentList) {
                return this.props.currentList.title
            } else return "My tasks";
        }

        return (
            <div className="task_list">
                <div className="task_list_header">{title()}</div>
                <div className="task_list_tile">
                    <div className="new_task">
                        <input className="new_task_input" type="text" disabled={!this.props.loggedIn} value={this.state.text} placeholder="Add new task..." onChange={this.handleChange} onKeyUp={this.tryAdding}/>
                        {optionalMessage}
                    </div>
                    {this.props.tasks.reverse().map((task) => <Task task={task} key={task.id}/>)}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        token: state.auth.token,
        tasks: state.tasks.tasks,
        currentList: state.lists.currentList
    }
}

export default connect(mapStateToProps, {tryAddingTask})(TaskList);