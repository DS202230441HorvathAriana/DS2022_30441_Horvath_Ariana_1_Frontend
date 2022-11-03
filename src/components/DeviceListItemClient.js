import React from 'react'
import "./../css/DeviceListItemClient.css"; 
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

const DeviceListItemClient = ({device, clientUsername}) => {

    const navigate = useNavigate();

    const onNavClick  = async (e) => {
        e.preventDefault();
        navigate('/client/device', {
            state: {clientUsername: clientUsername, device: device}
        });
    }

    return (
        <ul className='device'>
            <li>
                <ul className="device-details">
                    <li className='device-component2' id="dev-id">
                        <div>
                            <h3 className='device-component2'><b>ID:  </b>{device.meteringDeviceId}</h3>
                        </div>
                    </li>
                    <li className='device-component2' id="dev-addr">
                        <div>
                            <p className='list-component'><b>Address:  </b>{device.address} </p>
                        </div>
                    </li>
                    <li className='device-component2' id="dev-client">
                        <div>
                            <p className='list-component'><b>Client:  </b>{device.clientUsername} </p>
                        </div>
                    </li>
                    <li className='device-component2' id="dev-consum">
                        <div>
                            <p className='list-component'><b>Max Hourly Consumption:  </b>{device.maxHourlyEnergyConsumption} </p>
                        </div>
                    </li>
                    <button 
                        className='btn-nav' 
                        id='btn-nav' 
                        onClick={(e) => onNavClick(e)}>
                        {'>'}      
                    </button>
                </ul>
            </li> 
            <li id="description">
                <div>
                    <p className='list-component'><b>Description:  </b>{device.description} </p>
                </div>
            </li>  
        </ul>
    )
}

export default DeviceListItemClient