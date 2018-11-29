import React, {Component} from 'react';
import './Layout.css';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Game from '../../containers/Game/Game';
import LoginForm from '../LoginForm/LoginForm';
import ProfileInfo from '../Navigation/Toolbar/Profile/ProfileInfo/ProfileInfo';
import InfoInfo from '../Navigation/Toolbar/Info/InfoInfo/InfoInfo';
import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCGkIbzjAWOkP57WyHe-f1iz6wWQXT_cGA",
    authDomain: "hangman-58b03.firebaseapp.com",
    databaseURL: "https://hangman-58b03.firebaseio.com",
    projectId: "hangman-58b03",
    storageBucket: "hangman-58b03.appspot.com",
    messagingSenderId: "99553610892"
};
firebase.initializeApp(config);



class Layout extends Component {

    constructor (props){
        super(props);
        this.state = {loggedIn:"Login", profile:false, info:false, signErrors: null, user:null, categories:null, word:null};
    }

    writeUser = (name, pass)=> {
        if(name.length > 3 && pass.length > 7) {
            firebase.database().ref('/users/' + name).once('value').then(function (snapshot) {
                if (snapshot.val()) {
                    this.setState({signErrors: "Sign up user already exists"});
                } else {
                    var defaultData = {wins: 0, losses: 0};
                    firebase.database().ref('users/' + name).set({
                        username: name,
                        password: pass,
                        data: defaultData
                    }).then(function () {
                        var user = {username: name, password: pass, data: defaultData};
                        this.setState({signErrors: null, user: user, loggedIn: "Log out"});
                    }.bind(this));
                }
            }.bind(this));
        }else{
            this.setState({signErrors: "Minimum username length is 4. Minimum password length is 8"});
        }
    };

    getCategories = ()=>{
        console.log("getting categories");
        firebase.database().ref('/categories/allCategories').once('value').then(function (snapshot) {
            if(snapshot.val()) {
                    console.log("got categories ", snapshot.val());
                    this.setState({categories: snapshot.val()});
                }
        }.bind(this));
    };

    getWordsFromCategory = (category) =>{
        firebase.database().ref('/categories/'+category).once('value').then(function (snapshot) {
            if(snapshot.val()) {
                var words = snapshot.val();
                this.setState({word: words[Math.floor(Math.random()*words.length)]});
            }
        }.bind(this));

    };


    readUsers = (username, pass) => {
        if(username.length > 3 && pass.length > 7) {
         firebase.database().ref('/users/'+username).once('value').then(function (snapshot) {
            if(snapshot.val()) {
                var user = {};
                user.username = snapshot.val().username;
                user.password = snapshot.val().password;
                user.data = snapshot.val().data;
                if(user.password !== pass){
                    this.setState({signErrors: "Incorrect credentials"});
                }else{
                    this.setState({signErrors: null, user:user, loggedIn:"Log out"});
                }
            }else{
                this.setState({signErrors: "Incorrect credentials"});
            }
          }.bind(this));
        }else{
            this.setState({signErrors: "Minimum username length is 4. Minimum password length is 8"});
        }
    };


    updateUser = (updates) => {
        firebase.database().ref('/users/'+this.state.user.username).update(updates).then(function (err, data){
            console.log("Updated user ", err ," ", data);
        });
    };


    reset = ()=>{
        this.setState({loggedIn:"Login", profile:false, info:false, signErrors: null, user:null, categories:null, word:null});
    };

    updateLoggedIn = loggedIn => {
        if(loggedIn === "Login"){
            this.reset();
        }else{
            this.setState({loggedIn:loggedIn});
        }
    };

    profileClicked = profile => {
        this.setState({profile:profile});
    };

    infoClicked = info => {
        this.setState({info:info});
    };

    render () {
        return(
        <Aux>
            <Toolbar user={this.state.user} loggedIn={this.state.loggedIn} profile={this.state.profile} info={this.state.info}
                     updateLoggedIn={this.updateLoggedIn}
                     profileClicked={this.profileClicked}
                     infoClicked={this.infoClicked}
            />
            <main className={"Layout"}>
                {this.state.loggedIn === "Login" &&
                <LoginForm
                    updateUser={this.updateUser} readUsers={this.readUsers} writeUser={this.writeUser}/>
                }

                {this.state.signErrors &&
                    <div className={"errors"}><p>{this.state.signErrors}</p></div>
                }

                {this.state.loggedIn === "Log out" &&
                <Game updateUser={this.updateUser} user={this.state.user} getCategories={this.getCategories} getWordsFromCategory={this.getWordsFromCategory} categories={this.state.categories} word={this.state.word} />
                }

                {this.state.loggedIn === "Log out" && this.state.profile &&
                <ProfileInfo user={this.state.user} profileClicked={this.profileClicked}/>
                }

                {this.state.loggedIn === "Log out" && this.state.info &&
                <InfoInfo infoClicked={this.infoClicked}/>
                }



            </main>
        </Aux>
        );
    }

}

export default Layout