import React from 'react';
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
                            <button className="login_button" onClick={null}>Submit</button>
                        </div>
                    </div>
                </div>
            )
        } else return <div />;
    }
}

export default SignUp;