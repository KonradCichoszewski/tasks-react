import './App.css';
import React from 'react'; 
import TaskList from './components/TaskList.js';
import Login from './components/Login.js';
import SignUp from './components/SignUp';
import axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn: false,
      token: "",
      todos: []
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.delete = this.delete.bind(this);
    this.fetchTodos = this.fetchTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  fetchTodos() {
    axios.get("http://localhost:3000/todos", {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      this.setState({todos: res.data.reverse()})
    });
  }

  addTodo(text) {
    axios.post("http://localhost:3000/todos", { todos: [text]}, {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      if (res.status == 201) {
        this.fetchTodos()
      }
    }).catch(err => console.error(err.message));
  }

  login(token) {
    this.setState({loggedIn: true, token: token});
    this.fetchTodos();
  }

  logout() {
    this.setState({loggedIn: false, token: "", todos: []})
  }

  delete(id) {
    axios.delete("http://localhost:3000/todos/" + id, { headers: { authorization: this.state.token }
    }).then(res => {
      if (res.status = 200) {
        this.fetchTodos();
      }
    }).catch(err => console.error(err.message));
  }

  render() {
    return (
      <div className="app">
        <div className="navbar">
          <p className="logo">.Tasks</p>
        </div>
        <div className="content">
          <TaskList todos={this.state.todos} token={this.state.token} delete={this.delete} addTodo={this.addTodo} loggedIn={this.state.loggedIn}/>
          <div className="logging_section">
            <Login login={this.login} loggedIn={this.state.loggedIn} logout={this.logout}/>
            <SignUp loggedIn={this.state.loggedIn} login={this.login}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
