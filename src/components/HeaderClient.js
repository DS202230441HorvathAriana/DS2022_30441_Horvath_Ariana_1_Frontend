import React from 'react';
import { useNavigate } from "react-router-dom";
import "./../css/HeaderClient.css"; 

const HeaderClient = ({clientUsername}) => {
    const navigate = useNavigate()

    return (
        <header className='admin-header'>
            <img className='logo-admin-page' alt='This is a logo'/>
            <p className='logo-text-admin-main-page'>Energy Utility Platform</p>
            <img className='logo-admin-page' alt='This is a logo'/>
            <nav className='nav-bar'>
                    <ul>
                        <li className='nav-item'>
                            <a 
                                onClick={(e) => navigate('/client', {
                                    state: {clientUsername: clientUsername}
                                })}
                            >
                                <p className='text'>My Devices</p>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a 
                                onClick={(e) => navigate('/chat', {
                                    state: {
                                        username: clientUsername,
                                        role: false
                                    }
                                })}
                            >
                                <p className='text'>Chat with Admin</p>
                            </a>
                        </li>
                        <li className='nav-item'>
                            <a 
                                onClick={(e) => navigate('/')}
                            >
                                <p className='text'>Log Out</p>
                            </a>
                        </li>
                    </ul>
                </nav>
        </header>
    )
}

export default HeaderClient