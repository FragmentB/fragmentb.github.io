import React from "react";
import './TitleScreen.scss';
import TitleScreenImage from "../../images/TitleScreenImage.png"
import TitleCard from "../../images/TitleCard.png"
import MainMenu from "components/main-menu/MainMenu";

const TitleScreen = (props) => (
    <div className="titlePage" >
        <img className="titleImage" src={TitleScreenImage} alt= "Name" /> 
        <img className="titleText" src={TitleCard} alt= "Name" /> 
        <MainMenu></MainMenu>
    </div>
)

export default TitleScreen;