import React from 'react';
import './NewTask.css';

class NewTask extends React.Component {
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
        this.props.addTodo(e.target.value);
        this.setState({ text: ""});
        }
    }


    render() {
        let optionalMessage = <p></p>;
        if (!this.props.loggedIn) {
            optionalMessage = <p className="new_task_message">Log in or sign up in order to add new tasks</p>
        }

        return (
            <div className="new_task">
                <input className="new_task_input" type="text" disabled={!this.props.loggedIn} value={this.state.text} placeholder="Add new task..." onChange={this.handleChange} onKeyUp={this.tryAdding}/>
                {optionalMessage}
            </div>
        )
    }
}

export default NewTask;