import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CharacterDetails.css';

const CharacterDetails = ({ character }) => {

    const [characterHome, setCharacterHome] = useState(null);
    const [characterFilms, setCharacterFilms] = useState([]);
    const [loadingCharacterDetails, setLoadingCharacterDetails] = useState(false);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            try {
                setLoadingCharacterDetails(true);
                const charFilmResponses = await Promise.all(character.films.map(url => fetch(url)));
                const charFilmData = await Promise.all(charFilmResponses.map(response => response.json()));

                const charHomeResponse = await fetch(character.homeworld);
                const charHomeData = await charHomeResponse.json();

                setCharacterFilms(charFilmData);
                setCharacterHome(charHomeData);
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingCharacterDetails(false);
            }
        };

        if (character) {
            fetchCharacterDetail();
        }
    }, [character]);

    function capitaliseFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div className='character-details'>
            {loadingCharacterDetails ? (<h5>Loading character details...</h5>) : (
                (characterFilms && characterHome) &&
                <div className='character-info'>
                    <h5>{character.name}</h5>
                    <br></br>
                    {character.gender !== "n/a" &&
                        <p>Gender: <b>{capitaliseFirstLetter(character.gender)}</b></p>
                    }
                    <p>Homeworld: <b>{capitaliseFirstLetter(characterHome.name)}</b></p>
                    <p>Appeared in:</p>
                    <ol>
                        {characterFilms.map((film) => (
                            <li key={film.episode_id}>{film.title}</li>
                        ))}
                    </ol>
                </div>

            )}
        </div>
    )
}

export default CharacterDetails;