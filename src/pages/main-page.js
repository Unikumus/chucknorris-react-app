import React from "react";
import {mainAPI} from "../api/api";
import Joke from "../components/joke";
import {NavLink} from "react-router-dom";

class MainPage extends React.Component {

   constructor(props){
       super(props)

       this.state = {
           img: null,
           isButtonPressed: false,
           joke: null,
           timer: null,
           myJokes: [],
           button: false,
           currentJoke: null,
           addToFavoritesButton: false
       };



       this.clickButton = this.clickButton.bind(this);
       this.fetchData = this.fetchData.bind(this);
       this.addJoke = this.addJoke.bind(this);
       this.clickJokeButton = this.clickJokeButton.bind(this);
       this.clickfavoritesButton = this.clickfavoritesButton.bind(this);
   }



    componentWillMount() {

        const localData = localStorage.getItem("state")
        const Data =  localData ? JSON.parse(localData) : {}

        this.setState(Data)



     this.setState({
        currentJoke: null,
        isButtonPressed: false
        })
    }

    // Получить данные
    fetchData(){

        mainAPI.getRandomJokes().then(res => {

            this.setState({
                addToFavoritesButton: false,
                currentJoke: {
                    id: res.id,
                    img: res.icon_url,
                    joke: res.value,
                }
            })
        })
        //Установить таймер
        this.setState({
            timer: setTimeout(this.fetchData, 3000)
        })

    }

    //Шутки
    clickJokeButton() {
        this.setState({
            button: true
        })
    }


    //Перейти на эран избранное
    clickfavoritesButton() {
        localStorage.setItem("state", JSON.stringify(this.state))
    }

    // Получить шутку
    clickButton () {

        if(!this.state.isButtonPressed){

            this.setState({
                isButtonPressed: true,
                timer: this.fetchData()
            })
        } else {
            this.setState({
                isButtonPressed: false,
            })
            clearTimeout(this.state.timer) }
        }

    //Добавить шутку в стейт
    addJoke() {

       if(this.state.myJokes.length === 10){

           this.setState(state => {
               let {myJokes} = state;
               myJokes.splice(0, 1);
           })
       }

        this.setState({
            addToFavoritesButton: this.state.addToFavoritesButton === false,
        })

        if (this.state.addToFavoritesButton === false) {
            this.setState(state => {
                let {myJokes} = state;
                myJokes.push({
                    number: myJokes.length !== 0 ? myJokes.length : 0,
                    id: this.state.currentJoke.id,
                    joke: this.state.currentJoke.joke,
                    img: this.state.currentJoke.img,
                })
            })
        } else {
            this.setState(state => {
                let {myJokes} = state;
                myJokes.splice(0, 1);
            })
        }
    }


    render() {

        let btn_class = this.state.button ? "buttonNav" : "buttonNavPressed";
        let JokeCard;

            if (this.state.currentJoke === null) {
                JokeCard = "Данных нет"
            } else {
                JokeCard = <Joke buttonType={this.state.addToFavoritesButton} addJoke={this.addJoke}
                                 img={this.state.currentJoke.img} title={this.state.currentJoke.joke}/>
            }

        return (<div className="mainBlock">

                <div className="Navigation">
                    <button onClick={this.clickJokeButton} className="buttonNavPressed"><NavLink to='/'>Шутки</NavLink>
                    </button>

                    <button onClick={this.clickfavoritesButton} className={btn_class}><NavLink to='/favorites'>Избранное
                        ({this.state.myJokes.length})</NavLink>
                    </button>
                </div>

                <button className="button" onClick={this.clickButton}>Получить шутку</button>

                <div>
                    {JokeCard}
                </div>

            </div>
            )
        }
    }

export default MainPage;

