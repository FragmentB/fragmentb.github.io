import React from "react";
import './Gallery.scss'
import MainMenu from "components/main-menu/MainMenu";
import { characterList } from '../../data/characterList'


const Gallery = (props) => (
    <div className="galleryPage">
        <div className="galleryList">
            <h1>Gallery</h1>
            <div className="gallerySpace">
                {
                    characterList.characters.map((character)=>
                    <div className="galleryItem" key={character}>
                        {character}
                    </div>
                    )
                }
            </div>
        </div>
        <MainMenu />
    </div>
);

export default Gallery;