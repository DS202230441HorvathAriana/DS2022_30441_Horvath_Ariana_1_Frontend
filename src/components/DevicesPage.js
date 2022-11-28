import {useNavigate } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from "react";
import "./../css/AdminMainPage.css"; 
import Popup from "./Popup";
import {useLocation} from "react-router-dom"
import HeaderAdmin from "./HeaderAdmin";
import DeviceListItem from "./DeviceListItem";

const DevicesPage = () => {

    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    const navigate = useNavigate();
    const {state} = useLocation();
    const adminUsername = state.adminUsername;
    const [devicesList, setDevicesList] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            await fetch(`http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/devices`)
            .then(response => response.json())
            .then(body => {
                setDevicesList(body);
            });
        }
    
        getUsers()
    }, []);

    const onNewDeviceClick = async (e) => {
        e.preventDefault();
        navigate('/admin/devices/new-device', {
            state: {adminUsername: adminUsername}
        });
    }

    return(
        <div className='welcome-page'>
            <HeaderAdmin adminUsername={adminUsername}/>
            <label className='users-title'>Devices</label>
            <div className = 'container'>
                {devicesList.map((device) => (
                    <DeviceListItem 
                        device={device}
                        adminUsername={adminUsername}
                    />
                ))}
            </div>
            <button
                className='btn-new-user' 
                id='btn-new-user' 
                onClick={(e) => onNewDeviceClick(e)}>
                New Device
            </button>
            <Popup 
                trigger={popup.active}
                setPopup={setPopup}
                title={popup.title}
                message={popup.message}
            />
    </div>
    )
}

export default DevicesPage