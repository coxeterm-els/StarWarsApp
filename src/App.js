import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilmCard from './Components/FilmComponents/FilmCard/FilmCard';
import FilmSearch from './Components/FilmComponents/FilmSearch/FilmSearch';
import HeaderContainer from './Components/Header/HeaderContainer';

export const BASE_URL = 'https://swapi.dev/api/';

function App() {
  const [filmData, setFilmData] = useState(null);
  const [loadingFilmData, setLoadingFilmData] = useState(false);
  const [originalFilmData, setOriginalFilmData] = useState([]);
  const [filmSearch, setFilmSearch] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmData = async () => {
      try {
        setLoadingFilmData(true);
        const response = await fetch(BASE_URL + 'films/');
        const data = await response.json();
        const sortedData = data.results.sort((a, b) => a.episode_id - b.episode_id);
        setFilmData(sortedData);
        setOriginalFilmData(sortedData);
      } catch (error) {
        console.log('Error fetching films: ', error);
      } finally {
        setLoadingFilmData(false);
      }
    };

    fetchFilmData();
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('search');
    if (query) {
      setFilmSearch(query);
    }
  }, [location]);

  const numberToNumeral = useCallback((episode_id) => {
    const romanNumerals = {
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI'
    };
    return romanNumerals[episode_id];
  }, []);

  const generateTitle = useCallback((title, episode_id) => {
    const numeral = numberToNumeral(episode_id);
    return `Episode ${numeral} - ${title}`;
  }, [numberToNumeral]);

  const filterFilms = useCallback((films, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return films.filter(film =>
      generateTitle(film.title, film.episode_id).toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [generateTitle]);

  useEffect(() => {
    const films = [...originalFilmData];
    if (filmSearch === "") {
      setFilmData(originalFilmData);
    } else {
      setFilmData(filterFilms(films, filmSearch));
    }

    const params = new URLSearchParams();
    if (filmSearch) {
      params.set('search', filmSearch);
    }
    navigate(`?${params.toString()}`);
  }, [filmSearch, originalFilmData, navigate, filterFilms]);

  const filmTitles = filmData ? filmData.map(film => generateTitle(film.title, film.episode_id)) : [];

  return (
    <div className="App">
      <HeaderContainer />
      <FilmSearch setFilmSearch={setFilmSearch} filmTitles={filmTitles} />

      {loadingFilmData ? (
        <h3 style={{ color: '#f0ece1', marginTop: '2rem' }}>Loading films...</h3>
      ) : (
        <div className='film-list'>
          {filmData &&
            <div className='film-data-wrapper'>
              {filmData.map((film) => (
                <div className='film-instance' key={film.episode_id}>
                  <FilmCard film={film} generateTitle={generateTitle} />
                </div>
              ))}
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default App;