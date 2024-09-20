import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeaderContainer.css';

const HeaderContainer = () => {
    const [linkCopied, setLinkCopied] = useState(false);

    const manageCopy = () => {
        const linkToShare = window.location.href;
        navigator.clipboard.writeText(linkToShare)

        if (linkCopied === false) {
            setLinkCopied(true);
        }
    }

    return (
        <div className="header-container">
            <h3 id='welcome-title'>
                Welcome to the <span style={{ color: '#dd4e1e' }}>Star Wars</span> InfoHub
            </h3>
            <br></br>
            <button className='btn btn-custom-orange' onClick={() => manageCopy()}>{linkCopied ? 'Link Copied' : 'Share Link'}</button>
        </div>
    )
}

export default HeaderContainer;