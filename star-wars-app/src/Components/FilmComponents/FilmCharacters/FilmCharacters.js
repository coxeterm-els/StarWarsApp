import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './FilmCharacters.css';
import CharacterDetails from '../../CharacterComponents/CharacterDetails';

const FilmCharacters = ({ characters }) => {

    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [charactersData, setCharactersData] = useState([]);
    const [loadingCharactersData, setLoadingCharactersData] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const charactersPerPage = 10; 

    useEffect(() => {

        const fetchCharactersData = async () => {

            try {
                setLoadingCharactersData(true);
                const responses = await Promise.all(characters.map(url => fetch(url)));
                const data = await Promise.all(responses.map(response => response.json()));
                setCharactersData(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoadingCharactersData(false);
            }
        };

        if (characters.length > 0) {
            fetchCharactersData();
        }
    }, [characters])

    const indexOfLastCharacter = currentPage * charactersPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
    const currentCharacters = charactersData.slice(indexOfFirstCharacter, indexOfLastCharacter);

    const handleNextPage = () => {
        if (currentPage * charactersPerPage < charactersData.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className='film-characters'>
            {loadingCharactersData ? (<h5>Loading characters...</h5>) : (
                <div className='character-dashboard'>
                    <div className='character-list'>
                        {charactersData.length > 0 &&
                            <div className='characters-data-wrapper'>
                                <h5>Characters in the Film</h5>
                                <p>Select a character to view more details</p>
                                <ul>
                                    {currentCharacters.map((character) => (
                                        <li className='character-list-item' style={{ cursor: 'pointer' }} onClick={() => setSelectedCharacter(character)} key={character.name}>{character.name}</li>
                                    ))}
                                </ul>
                                <br></br>
                                <div className="pagination-controls">
                                    <button className='btn btn-custom-dark' onClick={handlePreviousPage} disabled={currentPage === 1}>
                                        Go Back
                                    </button>
                                    <button className='btn btn-custom-dark' style={{ marginLeft: '0.5rem' }} onClick={handleNextPage} disabled={currentPage * charactersPerPage >= charactersData.length}>
                                        See More
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                    {selectedCharacter && <CharacterDetails character={selectedCharacter} />}
                </div>
            )}
        </div>
    )
}

export default FilmCharacters;