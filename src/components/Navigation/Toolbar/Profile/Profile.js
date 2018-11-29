import React, { Component } from 'react';
import './Profile.css';
class Profile extends Component{

    constructor (props){
        super(props);
        this.state = {clicked:false};
        this.profileClick = this.profileClick.bind(this);
    }


    render () {
        return (
            <div className={"Profile"}>
                <button onClick={this.profileClick}>My profile</button>
            </div>
        );
    }



    profileClick = () => {
        if(this.props.profile){
            this.props.profileClicked(false);
        }else{
            this.props.profileClicked(true);
        }
    };




}




export default Profile;