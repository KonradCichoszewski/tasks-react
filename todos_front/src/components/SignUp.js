import React from 'react';
import axios from 'axios';
import './SignUp.css';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            name: ""
        }
    }

    setEmail(e) {
        this.setState({email: e.target.value});
    }

    setPassword(e) {
        this.setState({password: e.target.value});
    }

    setName(e) {
        this.setState({name: e.target.value});
    }

    handleSignup(e) {
        e.preventDefault();
        axios.post("http://localhost:3000/users", {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.status == 201) {
                axios.post("http://localhost:3000/login",{
                    email: this.state.email,
                    password: this.state.password
                }).then(res => {
                    this.props.login(res.data.token);
                }).catch(err => {
                    console.error(err.message);
                })
            }
            this.setState({ name: "", email: "", password: ""})
        }).catch(err => console.log(err.message));
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <div className="signup">
                    <div className="login_header">Sign up</div>
                    <div className="login_tile">
                        <div className="login_form">
                            <input className="login_input" type="text" placeholder="name" value={this.state.name} onChange={this.setName.bind(this)}/><br />
                            <input className="login_input" type="text" placeholder="email" value={this.state.email} onChange={this.setEmail.bind(this)}/><br />
                            <input className="login_input" type="password" placeholder="password" value={this.state.password} onChange={this.setPassword.bind(this)}/><br/>
                            <button className="login_button" onClick={this.handleSignup.bind(this)}>Submit</button>
                        </div>
                    </div>
                </div>
            )
        } else return <div />;
    }
}

export default SignUp;