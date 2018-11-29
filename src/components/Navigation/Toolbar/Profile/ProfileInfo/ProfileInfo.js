import React from 'react';
import './ProfileInfo.css';
import Aux from '../../../../../hoc/Aux';

const ProfileInfo = (props) => {
    //const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';
    const showHideClassName = 'modal display-block';
    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <button className={"exit"} onClick={()=>props.profileClicked(false)}>X</button>
                <div className={"text"}>

                {props.user !== null &&
                <Aux>
                <h1>{props.user.username}'s Profile</h1>
                <p>games won {props.user.data.wins}</p>
                <p>games lost {props.user.data.losses}</p>
                </Aux>
                }
                </div>
            </section>
        </div>
    );
};

export default ProfileInfo;