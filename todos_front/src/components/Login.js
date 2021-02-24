import axios from 'axios';
import React from 'react';
import './Login.css';

class Login extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        this.logout = this.logout.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        
        axios.post("http://localhost:3000/login",{
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            this.props.login(res.data.token);
            this.setState({email: "", password: ""})
        }).catch(err => {
            console.error(err.message);
        })
    };

    logout() {
        this.props.logout();
    }

    setEmail(e) {
        this.setState({email: e.target.value});
    }

    setPassword(e) {
        this.setState({password: e.target.value});
    }

    render() {
        if (!this.props.loggedIn) {
            return (
            <div className="login">
                <div className="login_header">Log in</div>
                <div className="login_tile">
                        <input className="login_input" type="text" placeholder="email" value={this.state.email} onChange={this.setEmail.bind(this)}/><br />
                        <input className="login_input" type="password" placeholder="password" value={this.state.password} onChange={this.setPassword.bind(this)}/><br/>
                        <button className="login_button" onClick={this.handleLogin.bind(this)}>Submit</button>
                </div>
            </div>
            )
        } else {
            return (
            <div className="login">
                <div className="login_header">Welcome</div>
                <div className="login_tile">
                    <button className="login_button" onClick={this.logout}>Log out</button>
                </div>
            </div>
            )
        }
    }
}

export default Login;