import React from "react";


let Joke = (props) => {

    let JokeCardButton;
    if (props.buttonType === true) {
        JokeCardButton = <button onClick={props.addJoke} className="buttonDelete">Удалить</button>
    } else {
        JokeCardButton = <button onClick={props.addJoke} className="button">Добавить в избранное</button>
    }

    return (<div className="jokeBlock">
        <img src={props.img} alt="альтернативный текст"/>
        <p> {props.title}</p>
        {JokeCardButton}
    </div>)


}

export default Joke;