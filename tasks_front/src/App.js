import "./App.css";
import React from "react";
import TaskList from "./components/TaskList.js";
import Login from "./components/Login.js";
import Lists from "./components/Lists";
import SignUp from "./components/SignUp";
import { connect } from "react-redux";
import { logout } from "./redux/actions/authActions";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let side_section;
    let logout;

    if (!this.props.loggedIn) {
      side_section = (
        <div className="side_section not_logged">
          <Login />
          <SignUp />
        </div>
      );
      logout = <div />;
    } else {
      side_section = (
        <div className="side_section logged">
          <Lists />
        </div>
      );
      logout = (
        <p onClick={this.props.logout} className="logout">
          Log out
        </p>
      );
    }

    return (
      <div className="app">
        <div className="navbar">
          <p className="logo">.Tasks</p>
          {logout}
        </div>
        <div className="content">
          <TaskList />
          {side_section}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};

export default connect(mapStateToProps, { logout })(App);
