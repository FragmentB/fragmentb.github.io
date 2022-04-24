import React from "react";
import './OptionScreen.css'
import MainMenu from 'components/main-menu/MainMenu';

const OptionScreen = (props) => (
    <div  className="optionPage">
        <div className="optionMenu">
            <h1>Options</h1>
            <div className="optionList">
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
                <div>Option Goes Here </div>
            </div>
        </div>
        <MainMenu></MainMenu>
    </div>
);

export default OptionScreen;