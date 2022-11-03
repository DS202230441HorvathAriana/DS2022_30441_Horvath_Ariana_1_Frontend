import React from 'react'
import "./../css/Popup.css"

const Popup = ({trigger, setPopup, title, message}) => {
    return ( trigger ) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button 
                    className='close-btn'
                    onClick={() => setPopup(false)}
                >
                    Close
                </button>
                <h3>{title}</h3>
                <p>{message}</p>
            </div>
        </div>
    ) : "";
}

export default Popup
