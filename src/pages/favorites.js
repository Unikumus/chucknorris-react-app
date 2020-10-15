import React from "react";
import {NavLink} from "react-router-dom";
import Joke from "../components/joke";


class FavoritesPage extends React.Component {

    constructor(props) {
        super(props)

        this.state = {};

        this.clickJokeButton = this.clickJokeButton.bind(this);
        this.deleteJoke = this.deleteJoke.bind(this);
        this.deleteAllJokes = this.deleteAllJokes.bind(this);
    }
    componentWillMount() {

       const localData = localStorage.getItem("state")
       const Data =  localData ? JSON.parse(localData) : {}

       this.setState(Data)
    }

    //Удалить все шутки
    deleteAllJokes(){
        this.setState({
            myJokes:  []
        })
    }


    //Удалить шутку
    deleteJoke(val){

        var myJokesArray  = JSON.parse(JSON.stringify(this.state.myJokes));
        var index;

        function contains(arr, elem) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id === elem) {
                    return i;
                }
            }
            return false;
        }

        index = contains(myJokesArray, val)
        myJokesArray.splice(index, 1);

        this.setState({
            myJokes:  myJokesArray
        })


    }
    // Перейти на главный экран
    clickJokeButton(){
        localStorage.setItem("state", JSON.stringify(this.state))
    }


    render() {

        let btn_class = !this.state.button ? "buttonNav" : "buttonNavPressed";
        let dataStatus =   this.state.myJokes.length === 0 ? "Данных  нет" : null;

        return (<div className="mainBlock">

                <div className="Navigation" >
                    <button  onClick={this.clickJokeButton} className="buttonNav" ><NavLink to='/'>Шутки</NavLink></button>
                    <button className={btn_class} ><NavLink to='/favorites'>Избранное ({this.state.myJokes.length})</NavLink>
                    </button>
                </div>

                <div >
                    <button  onClick={this.deleteAllJokes} className="buttonDelete" >Удалить все</button>
                </div>


                <div>
                    {
                        this.state.myJokes.map(el => <Joke
                                                        buttonType={true}
                                                        id={el.id}
                                                        addJoke={()=> this.deleteJoke(el.id)}
                                                        img = {el.img}
                                                        title = {el.joke}
                                                        key = {el.id}
                                                        />)
                    }
                </div>

                {
                    dataStatus
                }
            </div>
        )
    }
}

export default FavoritesPage;

