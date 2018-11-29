import React, { Component } from 'react';
import './Info.css';
class Info extends Component{

    constructor (props){
        super(props);
        this.state = {clicked:false};
        this.infoClick = this.infoClick.bind(this);
    }


    render () {
        return (
            <div className={"Info"}>
                <button onClick={this.infoClick}>Info</button>
            </div>
        );
    }



    infoClick = () => {
        if(this.props.info){
            this.props.infoClicked(false);
        }else{
            this.props.infoClicked(true);
        }
    };




}




export default Info;