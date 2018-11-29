import React, { Component } from 'react';
import './LoginForm.css';
class LoginForm extends Component{

    constructor (props){
        super(props);
        //this.loginClicked = this.loginClicked.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {username: "", password: "", login: "Login", signUp: "Sign Up"};
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log(this.state.username, " ", this.state.password, "login");
        this.props.readUsers(this.state.username, this.state.password);
    };

    handleChangeUsername = (event)=> {
        var temp  = event.target.value;
        temp = temp.replace(/[^A-Za-z0-9]/g,'');

        this.setState({username: temp});
    };

    handleChangePassword = (event)=> {

        this.setState({password: event.target.value});
    };

    handleSignUp = (event) => {
        event.preventDefault();
        console.log(this.state.username, " ", this.state.password, "signup");
        this.props.writeUser(this.state.username, this.state.password);

    };

    render () {
        return (
            <div className={"LoginForm"}>
                <h1>Welcome To Hangman</h1>
                <h2>Login to hang men</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Username:
                        <input type="text" value={this.state.username} onChange={this.handleChangeUsername}/>
                    </label>
                    <br/>
                    <label>Password:
                        <input type="password" value={this.state.password} onChange={this.handleChangePassword} />
                    </label>
                    <br/>
                    <div className={"buttons"}>
                    <input className={"submitButton"} type="submit" value={this.state.login}/>
                    <button className={"submitButton"} onClick={this.handleSignUp}>Sign Up</button>
                    </div>

                </form>
            </div>
        );
    }

}




export default LoginForm;

