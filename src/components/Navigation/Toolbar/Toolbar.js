import React from 'react';
import './Toolbar.css';
import Login from './Login/Login';
import Profile from './Profile/Profile';
import Info from './Info/Info';
const toolbar = (props) => {

    return (
        <header className={"Toolbar"}>

            {props.loggedIn === "Log out" &&
            <Info infoClicked={props.infoClicked} info={props.info}/>
            }

            {props.loggedIn === "Log out" &&
            <Profile profileClicked={props.profileClicked} profile={props.profile} user={props.user}/>
            }

            <nav>
                {props.loggedIn === "Log out" &&
                <Login loggedIn={props.loggedIn} updateLoggedIn={props.updateLoggedIn}/>
                }
            </nav>

        </header>
    );
};


export default toolbar;