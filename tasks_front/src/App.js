import './App.css';
import React from 'react'; 
import TaskList from './components/TaskList.js';
import Login from './components/Login.js';
import Lists from './components/Lists';
import SignUp from './components/SignUp';
import axios from 'axios';
import { connect } from "react-redux";

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      token: "",
      lists: [],
      tasks: []
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.fetchLists = this.fetchLists.bind(this);
    this.fetchTasks = this.fetchTasks.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  fetchTasks(list_id) {
    axios.get("http://localhost:3000/tasks/" + list_id, {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      this.setState({todos: res.data.reverse()})
    });
  }

  addTask(text, list_id) {
    axios.post("http://localhost:3000/tasks/" + list_id, { tasks: [text]}, {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      if (res.status == 201) {
        this.fetchTasks()
      }
    }).catch(err => console.error(err.message));
  }

  fetchLists() {
    axios.get("http://localhost:3000/lists", {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      this.setState({lists: res.data.reverse()})
    });
  }

  login(token) {
    this.setState({loggedIn: true, token: token});
    this.fetchLists();
  }

  logout() {
    this.setState({loggedIn: false, token: "", todos: []})
  }

  deleteTask(task_id) {
    axios.delete("http://localhost:3000/tasks/" + task_id, { headers: { authorization: this.state.token }
    }).then(res => {
      if (res.status = 200) {
        this.fetchTasks();
      }
    }).catch(err => console.error(err.message));
  }

  render() {
    let side_section;

    if (!this.props.loggedIn) {
      side_section =
        <div className="side_section not_logged">
          <Login login={this.login} loggedIn={this.state.loggedIn} logout={this.logout}/>
          <SignUp loggedIn={this.state.loggedIn} login={this.login}/>
        </div>
    } else {
      side_section = <div className="side_section logged"><Lists lists={this.state.lists}/></div>
    }

    return (
      <div className="app">
        <div className="navbar">
          <p className="logo">.Tasks</p>
          <p onClick={this.logout}>Log out</p>
        </div>
        <div className="content">
          <TaskList tasks={this.state.tasks} token={this.state.token} delete={this.delete} addTask={this.addTask} loggedIn={this.state.loggedIn}/>
          {side_section}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => { return {loggedIn: state.auth.loggedIn} };

export default connect(mapStateToProps)(App);
