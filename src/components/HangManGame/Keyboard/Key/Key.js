import React from 'react';
import './Key.css';

const Key = (props) => (

    <button disabled={props.applyStyle !== "Key_default"} className={props.applyStyle} onClick={() => props.changeKeyState(props.keynum, "wrong")}>{props.keynum}</button>

);

export default Key;