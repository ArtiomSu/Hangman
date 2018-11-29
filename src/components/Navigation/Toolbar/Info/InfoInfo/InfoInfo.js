import React from 'react';
import './InfoInfo.css';
import Aux from '../../../../../hoc/Aux';

const InfoInfo = (props) => {
    //const showHideClassName = props.show ? 'modal display-block' : 'modal display-none';
    const showHideClassName = 'modal display-block';
    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <button className={"exit"} onClick={()=>props.infoClicked(false)}>X</button>
                <div className={"text"}>

                    {props.user !== null &&
                    <Aux>
                        <h1>How to Play</h1>
                        <p>You are presented with a number of different categories from which you must choose one or pick the surprise me option which will pick a random one. You will then have to guess the hidden word by clicking the letters on the virtual keyboard. You will have 10 guesses if you fail the man will be hanged and you will loose the game. If you manage to guess the correct word in less then 10 guesses you win and can play again</p>
                    </Aux>
                    }
                </div>
            </section>
        </div>
    );
};

export default InfoInfo;