import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import "./../css/ClientMainPage.css"; 
import {useLocation} from "react-router-dom"
import HeaderClient from "./HeaderClient";
import DeviceListItemClient from "./DeviceListItemClient";

const ClientMainPage = () => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const clientUsername = state.clientUsername;
    const [devicesList, setDevicesList] = useState([]);

    useEffect(() => {
        const getDevices = async () => {
            await fetch(`http://localhost:8080/energyUtility/devices/${clientUsername}`)
            .then(response => response.json())
            .then(body => {
                console.log(body);
                setDevicesList(body);
            });
        }
    
        getDevices()
    }, []);

    return(
        <div className='welcome-page'>
            <HeaderClient clientUsername={clientUsername}/>
            <label className='my-devices-title'>My Energy Metering Devices</label>
            <div className = 'container-devices'>
                {devicesList.map((device) => (
                    <DeviceListItemClient 
                        device={device}
                        clientUsername={clientUsername}
                    />
                ))}
            </div>
    </div>
    )
}

export default ClientMainPage