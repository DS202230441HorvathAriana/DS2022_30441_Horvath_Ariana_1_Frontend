import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom'
import { useState, useEffect } from "react";
import "./../css/ClientMainPage.css"; 
import {useLocation} from "react-router-dom"
import HeaderClient from "./HeaderClient";
import DeviceListItemClient from "./DeviceListItemClient";
import SockJsClient from 'react-stomp';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ClientMainPage = () => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const clientUsername = state.clientUsername;
    const [devicesList, setDevicesList] = useState([]);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const SOCKET_URL = 'http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/ws-message';
    
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
      
    useEffect(() => {
        const getDevices = async () => {
            await fetch(`http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/devices/${clientUsername}`)
            .then(response => response.json())
            .then(body => {
                console.log(body);
                setDevicesList(body);
            });
        }
    
        getDevices()
    }, []);

    let onMessageReceived = (msg) => {
        console.log(msg.deviceId);
        console.log(msg.clientUsername)
        
        if (msg.clientUsername === clientUsername) {
            setMessage(msg.message);
            setOpen(true); 
        }
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            setOpen(false);
            return;
        }
    
        setOpen(false);
    };

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
           
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/message']}
                onConnect={console.log("Connected!!")}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => onMessageReceived(msg)}
                debug={false}
            />
            <Snackbar open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ClientMainPage