import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilmCard.css';
import FilmDetails from '../FilmDetails/FilmDetails';
import FilmCharacters from '../FilmCharacters/FilmCharacters';

const FilmCard = ({ film, generateTitle }) => {

    const [showCharacters, setShowCharacters] = useState(false);

    const handleToggle = () => {
        setShowCharacters(!showCharacters);
    }

    return (
        <div className='card'>
            <div className='card-body'>
            <h4 className='card-title'>{generateTitle(film.title, film.episode_id)}</h4>
            <br></br>
            <div className='card-text'>
            {showCharacters ? (<FilmCharacters characters={film.characters} />) : (<FilmDetails film={film} />)}
            <hr></hr>
            <button className='btn btn-custom-orange' onClick={handleToggle}>{showCharacters ? 'View Film Details' : 'View Characters' }</button>
            </div>
            </div>
        </div>
    )
}

export default FilmCard;