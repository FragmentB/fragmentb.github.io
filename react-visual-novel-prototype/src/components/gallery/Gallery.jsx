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
                    characterList.characters.map((character)=> {
                        try{
                             //TODO: Hide character names for locked people
                            const thumb = require(`../../images/Characters/${character}/Portrait.png`);
                            return(
                            <div className="galleryItem" key={character}>
                                <img src={thumb} alt={character} height={90} width={90} />
                                <span className="characterName">{character}</span>
                            </div>
                            )
                        }
                        catch(err)
                        {

                            return(<div className="underConstruction" key={character}>
                            <p>Coming</p>
                            <p>Soon {character}</p>
                            </div>
                            )
                        }
                    })
                }
            </div>
        </div>
        <MainMenu />
    </div>
);

export default Gallery;