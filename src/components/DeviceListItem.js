import React from 'react'
import "./../css/DeviceListItem.css"; 
import { useNavigate } from 'react-router-dom';
import Popup from "./Popup";
import { useState } from "react";

const DeviceListItem = ({device, adminUsername}) => {

    const navigate = useNavigate();
    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    
    const onUpdateClick = async (e) => {
        e.preventDefault()
        navigate('/admin/devices/edit-device',{
            state: {device: device, adminUsername: adminUsername, showUpdateButton: true}
        });
    }
    const onDeleteClick = async (e) => {
        e.preventDefault()
        fetch(`http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/devices/${device.meteringDeviceId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(body => {
            if (body.success === false) {
                setPopup({active: true, title: "Oops!", message: body.message});
            }
            else {
                window.location.reload(false);
            }
        });
    }
    return (
        <ul className='device'>
            <li className='device-component'>
                <div>
                    <a 
                        href='/admin/devices/edit-device'
                        onClick={(e) => navigate('/admin/devices/edit-device', {
                            state: {device: device, adminUsername: adminUsername, showUpdateButton: false}
                        })}>
                    <h3 className='device-component'><b>ID:  </b>{device.meteringDeviceId}</h3>
                    </a>
                </div>
            </li>
            <li className='device-component'>
                <div>
                    <p className='addr-component'><b>Address:  </b>{device.address} </p>
                </div>
            </li>
            <li className='device-component'>
                <div>
                    <p className='addr-component'><b>Client:  </b>{device.clientUsername} </p>
                </div>
            </li>
            <button 
                className='btn-device' 
                id='btn-delete' 
                onClick={(e) => onDeleteClick(e)}>
                Delete      
            </button>
            <button 
                className='btn-device' 
                id='btn-update' 
                onClick={(e) => onUpdateClick(e)}>
                Edit      
            </button>
            <Popup 
                trigger={popup.active}
                setPopup={setPopup}
                title={popup.title}
                message={popup.message}
            />
        </ul>
    )
}

export default DeviceListItem