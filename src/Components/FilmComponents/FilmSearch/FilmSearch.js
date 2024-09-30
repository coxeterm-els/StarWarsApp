import 'bootstrap/dist/css/bootstrap.min.css';
import './FilmSearch.css';

const FilmSearch = ({ setFilmSearch, filmTitles }) => {

    return (
        <div className='film-search'>
            <h5 id='search-instruction'><span style={{ color: '#e5703d' }}>Search below</span> to find a particular film</h5>
            <input type='text' className='form-control' placeholder='Search for a film' onChange={(e) => setFilmSearch(e.target.value)} list='film-titles' />
            <datalist id='film-titles'>
                {filmTitles.map((title, index) => (
                    <option key={index} value={title} />
                ))}
            </datalist>
        </div>
    )
}

export default FilmSearch;