import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Keyboard from '../../components/HangManGame/Keyboard/Keyboard';
import Guesses from '../../components/HangManGame/Keyboard/Guesses/Guesses';
import Picture from '../../components/HangManGame/Picture/Picture';
import InfoBoard from '../../components/HangManGame/InfoBoard/InfoBoard';
import Category from '../../components/HangManGame/Category/Category';
import './Game.css';

class Game extends Component{



    constructor (props){
        super(props);

        this.STATUSES = ["playing", "dead", "won"];
        this.state={categories: [], category: null, word: null, guesses: 0, status: this.STATUSES[0], currentKey: null};
        //this.setState({word: "umbrella"});
    }

    componentWillMount(){
        if(this.props.categories == null){
            this.props.getCategories();
        }

    }

    shouldComponentUpdate(nextProps, nextState){


        if(nextProps.word !== null && this.props.word !== nextProps.word){
            this.setWord(nextProps.word);
        }


        if(nextProps.categories !== null && this.props.categories !== nextProps.categories){
            console.log("running");

            this.updateCategories(nextProps.categories);
            return true;
        }else{
            return true;
        }
    }

    updateCategories = (categories) =>{
        this.setState({categories: categories});
    };

    setWord = (word) => {
        this.setState({word: word});
    };

    increaseGuess = () => {
        if(this.state.guesses <9){
            this.setState({guesses: this.state.guesses + 1});
        }else{
            this.setState({status: this.STATUSES[1]});
            this.update(false);
        }
    };

    update = (won)=>{
        var temp = {...this.props.user};
        if(won){
            temp.data.wins = temp.data.wins + 1;
        }else{
            temp.data.losses = temp.data.losses + 1;
        }
        this.props.updateUser(temp);
    };

    gameWon = () => {
        this.setState({status: this.STATUSES[2]});
        this.update(true);

    };

    setCurrentKey = (currentKey) => {
        this.setState({currentKey: currentKey});
    };

    restart = () => {
        this.setState({guesses: 0, word: null, status: this.STATUSES[0], category: null});
    };

    showCategories = () => {
        console.log("showing cats ", this.state.categories.length);
        if(this.state.categories.length > 0){
            var list = [];
            for(var i=0; i<this.state.categories.length; i++){
                var classToDisplay = "myButton cat"+i;
                list.push(
                    <Category cssClass={classToDisplay} key={this.state.categories[i]} category={this.state.categories[i]} categorySelected={this.categorySelected}/>
                );
            }
            list.push(
                <Category cssClass={"myButton catR"} key="randomCategory" category="surprise me" categorySelected={this.categorySelected}/>
            );
            return(list);


        } else{
            return null;
        }

    };

    categorySelected = (category) => {
        var selectedCat;
        if(category === "surprise me"){
            selectedCat = this.state.categories[Math.floor(Math.random()*this.state.categories.length)];
            console.log("random cat choosen ", selectedCat);
        }else{
            selectedCat = category;
            console.log("cat choosen ", category);
        }
        this.setState({category: selectedCat});
        this.props.getWordsFromCategory(selectedCat);

    };

    render () {
        return (
            <Aux>
            <div className={"Game"}>
            {this.state.word && <InfoBoard category={this.state.category} status={this.state.status} word={this.state.word} statuses={this.STATUSES}/>}
            <br/>
            {this.state.status === this.STATUSES[0] && this.state.word && <Keyboard word={this.state.word} setCurrentKey={this.setCurrentKey}/>}
            <br/>
            {this.state.status === this.STATUSES[0] && this.state.word && <Guesses status={this.state.status} currentKey={this.state.currentKey} word={this.state.word} gameWon={this.gameWon} increaseGuess={this.increaseGuess}/>}
            <br/>

            {this.state.word && <Picture whichImage={this.state.guesses}/>}
            {this.state.category === null &&
            this.showCategories()
            }
            <br/>
            {this.state.status !== this.STATUSES[0] && this.state.word && <button className={"Restart"} onClick={()=>this.restart()}>Play Again</button>}
            </div>
            </Aux>
        );
    }

}


export default Game;