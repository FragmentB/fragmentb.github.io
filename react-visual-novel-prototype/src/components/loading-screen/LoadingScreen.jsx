import React from "react";
import './LoadingScreen.scss'
import MainMenu from "components/main-menu/MainMenu";

const LoadingScreen = (props) => (
    <div className="loadingScreen">
        <div className="loadingMenu">
            <h1>Loading Screeen</h1>
        </div>
        <MainMenu />
    </div>
);
export default LoadingScreen;