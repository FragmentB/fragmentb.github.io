import React from "react";
import './Gallery.scss'
import MainMenu from "components/main-menu/MainMenu";


const Gallery = (props) => (
    <div className="galleryPage">
        <div className="galleryList">
            <h1>Gallery</h1>
        </div>
        <MainMenu />
    </div>
);

export default Gallery;