import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Key from './Key/Key';
import './Keyboard.css';



class Keyboard extends Component{



    constructor (props){
        super(props);
        this.keyList = {};
        this.KEYSTATES = ['default', 'wrong', 'right'];
        var alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase().split('');
        for(var i=0; i<alphabet.length; i++){
            this.keyList[alphabet[i]] = {state:this.KEYSTATES[0]};
        }
        this.state = {keysList: this.keyList};
    }

    changeKeyState = (keyid, state) => {

        var temp = {...this.state.keysList};
        temp[keyid] = {state: state};
        if(this.props.word.toUpperCase().includes(keyid)){
            temp[keyid] = {state:this.KEYSTATES[2]};
        }
        this.setState({keysList: temp});
        this.props.setCurrentKey(keyid);
    };

    genkeys = () => {

        var allkeys = Object.keys(this.state.keysList).map(key => {
            var applyStyle = "Key_used";
            if(this.state.keysList[key].state === this.KEYSTATES[0]){
                applyStyle = "Key_default";
            }else if(this.state.keysList[key].state === this.KEYSTATES[2]){
                applyStyle = "Key_Guess";
            }



            return (<Key keynum={key} key={key} applyStyle={applyStyle}
                         changeKeyState={this.changeKeyState}
            />);
        });


        Array.prototype.insert = function ( index, item ) {
            this.splice( index, 0, item );
        };
        allkeys.insert(9, <div key={"div9"} className={"splitDiv"}/>);
        allkeys.insert(10, <div key={"div10"} className={"pushDiv"}/>);
        allkeys.insert(19, <div key={"div19"} className={"splitDiv"}/>);



        return allkeys;


    };


    render () {
        return (
            <Aux>
                <div className={"Keyboard"}>
                {this.genkeys()}
                </div>


            </Aux>

        );
    }

}


export default Keyboard;