import React, { Component } from 'react';
import './Login.css';
class Login extends Component{

    constructor (props){
        super(props);

        this.loginClicked = this.loginClicked.bind(this);
    }


    render () {
        return (
            <div className={"Login"}>
                <button onClick={this.loginClicked}>{this.props.loggedIn}</button>

            </div>
        );
    }



    loginClicked = () => {
        if(this.props.loggedIn === "Login") {
            this.props.updateLoggedIn("Log out");
        }else{
            this.props.updateLoggedIn("Login");
        }
    };




}




export default Login;