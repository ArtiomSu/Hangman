import React from 'react';
import './InfoBoard.css';

const InfoBoard = (props) => (

    <div className={"InfoBoard"}>
        {message(props.status, props.word, props.category, props.statuses)}
    </div>

);

function message(status, word, category, statuses) {
    if(statuses[0] === status){
        return(<h1>Category is {category}</h1>);
    }else if(statuses[1] === status){
        return(<h1 className={"loose"}>Sorry you lost! The secret word was {word}</h1>);
    }else{
        return(<h1 className={"win"}>Great job you guessed the secret word</h1>);
    }

}

export default InfoBoard;