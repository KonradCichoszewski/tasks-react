import './TaskList.css';
import React from 'react';
import Task from './Task.js';
import NewTask from './NewTask.js';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let tasks = [];
        for (let task of this.props.tasks) {
            tasks.push(<Task task={task} key={task.id} token={this.props.token} delete={this.props.delete}/>)
        }

        return (
            <div className="task_list">
                <div className="task_list_header">My tasks</div>
                <div className="task_list_tile">
                    <NewTask addTask={this.props.addTask} loggedIn={this.props.loggedIn}/>
                    {tasks}
                </div>
            </div>
        )
    }
}

export default TaskList;