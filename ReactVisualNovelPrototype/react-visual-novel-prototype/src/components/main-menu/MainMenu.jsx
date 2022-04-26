import React from "react";
import { Link, useLocation } from "react-router-dom"
import './MainMenu.scss'

function HeaderView() {
    let location = useLocation();
    console.log(location.pathname);
    return <span>Path : {location.pathname}</span>
  }

const MainMenu = (props) => (
    <div className="menuBar">
        <span>
            <Link className="menuLink" to="/"> Title Screen </Link>  
        </span>
        <span>
            <Link className="menuLink" to="/game"> Start Game </Link>  
        </span>
        <span>
            <Link className="menuLink" to="/load"> Load Game </Link>  
        </span>
        <span>
            <Link className="menuLink" to="/option"> Options </Link>  
        </span>
        <span>
            <Link className="menuLink" to="/gallery"> Gallery </Link>  
        </span> 
    </div>
);

export default MainMenu;