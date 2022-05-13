import React from "react";
import { Link, useLocation } from "react-router-dom"
import './MainMenu.scss'

const menuList = [
    {path:'/', display: 'Title Screen' },
    {path:'/game', display: 'Start Game' },
    {path:'/save', display: 'Save Game' },
    {path:'/load', display: 'Load Game' },
    {path:'/option', display: 'Options' },
    {path:'/gallery', display: 'Gallery' },
]

function MainMenu() {
    const location = useLocation();

    const iscurrentURL = (url)=> {

        return location.pathname.toLowerCase() === url.toLowerCase();
        

    }
    
    return (
        <div className="menuBar">
            {
                menuList.map((link)=>
                    !iscurrentURL(link.path)? 
                        <span key={link.path}>
                        <Link className="menuLink" to={link.path}> {link.display}</Link>
                        </span>
                    :null
                )
            }
        </div>
    );
}

export default MainMenu;