import './App.css';
import React from 'react'; 
import TaskList from './components/TaskList.js';
import Login from './components/Login.js';
import Lists from './components/Lists';
import SignUp from './components/SignUp';
import { connect } from "react-redux";
import { logout } from './redux/actions/authActions';

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render() {
    let side_section;

    if (!this.props.loggedIn) {
      side_section =
        <div className="side_section not_logged">
          <Login />
          <SignUp />
        </div>
    } else {
      side_section = <div className="side_section logged"><Lists /></div>
    }

    return (
      <div className="app">
        <div className="navbar">
          <p className="logo">.Tasks</p>
          <p onClick={this.props.logout}>Log out</p>
        </div>
        <div className="content">
          <TaskList />
          {side_section}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => { return {
  loggedIn: state.auth.loggedIn,
}};

export default connect(mapStateToProps, { logout })(App);
