import 'bootstrap/dist/css/bootstrap.min.css';
import './FilmDetails.css';

const FilmDetails = ({ film }) => {

    function getYearFromDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();

        return year;
    }

    return (
        <div className='film-details'>
            <p>Release: <b>{getYearFromDate(film.release_date)}</b></p>
            <p>Director: <b>{film.director}</b></p>
            <hr></hr>
            <h5>Overview</h5>
            <p>{film.opening_crawl}</p>
        </div>
    )
}

export default FilmDetails;