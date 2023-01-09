import React from 'react';
import { useNavigate } from "react-router-dom";
import "./../css/HeaderAdmin.css"; 

const HeaderAdmin = ({adminUsername}) => {
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
                            onClick={(e) => navigate('/admin', {
                                state: {
                                    adminUsername: adminUsername
                                }
                            })}
                        >
                            <p className='text'>Manage Users</p>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a 
                            onClick={(e) => navigate('/admin/devices', {
                                state: {
                                    adminUsername: adminUsername
                                }
                            })} 
                        >
                            <p className='text'>Manage Devices</p>
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a 
                            onClick={(e) => navigate('/chat', {
                                state: {
                                    username: adminUsername,
                                    role: true
                                }
                            })}
                        >
                            <p className='text'>Chat with Clients</p>
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

export default HeaderAdmin