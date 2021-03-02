import React from "react";
import { connect } from "react-redux";
import { tryLogin } from "../redux/actions/authActions";
import { tryGettingLists } from "../redux/actions/listsActions";
import { tryGettingTasks } from "../redux/actions/tasksActions";
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };

    this.logout = this.logout.bind(this);
  }

  handleLogin = async () => {
    this.props.tryLogin(this.state.email, this.state.password);
  };

  logout() {
    this.props.logout();
  }

  setEmail(e) {
    this.setState({ email: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    if (!this.props.loggedIn) {
      return (
        <div className="login">
          <div className="login_header">LOGIN</div>
          <div className="login_tile">
            <input
              className="login_input"
              type="text"
              placeholder="email"
              value={this.state.email}
              onChange={this.setEmail.bind(this)}
            />
            <br />
            <input
              className="login_input"
              type="password"
              placeholder="password"
              value={this.state.password}
              onChange={this.setPassword.bind(this)}
            />
            <br />
            <button
              className="login_button"
              onClick={this.handleLogin.bind(this)}
            >
              Submit
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="login">
          <div className="login_header">Welcome</div>
          <div className="login_tile">
            <button className="login_button" onClick={this.logout}>
              Log out
            </button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    lists: state.lists.lists,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  tryLogin,
  tryGettingLists,
  tryGettingTasks,
})(Login);
