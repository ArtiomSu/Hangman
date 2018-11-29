import React, { Component } from 'react';
import Aux from '../../../../hoc/Aux';
import Key from '../Key/Key';

class Guesses extends Component{

    constructor (props){
        super(props);
        this.keyList = [];
        var temp = this.props.word.toUpperCase().split('');
        console.log(temp.length+ " length of temp in constructor");
        for(var i=0; i<temp.length; i++){
            this.keyList.push({letter: temp[i], display: ""});
           // this.keyList[i].letter = temp[i];
          //  this.keyList[i].display = "";
        }
        this.state = {keysList: this.keyList, correctGuesses: 0, change: false};
    }

    /*
    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.currentKey !== prevState.currentKey ) {
            return {change: true};
        }
        else{
            return {change: false};
        }
    }
*/

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.currentKey !== this.props.currentKey){
            this.foundKey(nextProps.currentKey);
            return true;
        }else{
            return true;
        }
    }

    foundKey = (keyid) => {
        var temp = [...this.state.keysList];
        var tempCount = this.state.correctGuesses;
        var found = false;
        for(var i=0; i < temp.length; i++){
            if(keyid === temp[i].letter){
                temp[i].display = temp[i].letter;
                tempCount++;
                found = true;
            }
        }

        if(!found){
            this.props.increaseGuess();
        }
        if(this.props.word.length === tempCount){
            this.props.gameWon();
        }
         this.setState({keysList: temp, correctGuesses: tempCount, change: false});
    };

    restart = () => {
        var kl = [];
        var temp = this.props.word.toUpperCase().split('');
        console.log(temp.length+ " length of temp in constructor");
        for(var i=0; i<temp.length; i++){
            kl.push({letter: temp[i], display: ""});
        }
        this.setState = {keysList: kl, correctGuesses: 0, change: false};
    };

    genkeys = () => {
        var keysarray = [];
        var applyStyle = "Key_Guess";
        for(var i =0; i< this.state.keysList.length; i++){
            keysarray.push(<Key keynum={this.state.keysList[i].display} key={this.state.keysList[i].letter+i} applyStyle={applyStyle}/>);
        }
        return keysarray;
    };


    render () {
        console.log(this.state.change);
        return (
            <Aux>
                {this.genkeys()}
            </Aux>

        );
    }

}


export default Guesses;