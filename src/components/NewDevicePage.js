import {useNavigate, useLocation} from "react-router-dom";
import React from 'react';
import { useState, useEffect } from "react";
import "./../css/NewDevicePage.css"; 
import HeaderAdmin from "./HeaderAdmin";
import Popup from "./Popup";
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const NewDevicePage = () => {

    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [maxHourlyEnergyConsumption, setMaxHourlyEnergyConsumption] = useState(0.0);
    const [clientUsername, setClientUsername] = useState("");
    const [popup, setPopup] = useState({active: false, title: "", message: ""});
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const {state} = useLocation();
    const adminUsername = state.adminUsername;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const theme = useTheme();
    const [clientName, setClientName] = useState([]);
    const MenuProps = {
        PaperProps: {
            style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            },
        },
    };

    function getStyles(name, clientName, theme) {
        return {
          fontWeight:
            clientName.indexOf(name) === -1
              ? theme.typography.fontWeightRegular
              : theme.typography.fontWeightMedium,
        };
      }

    useEffect(() => {
        const getClients = async () => {
            await fetch(`http://localhost:8080/energyUtility/clients`)
            .then(response => response.json())
            .then(body => {
                console.log(body);
                setClients(body);
            });
        }
    
        getClients()
    }, []);
   
    const validateInput = async () => {
        if(!address) {
            setPopup({active: true, title: "Oops!", 
                message: "Address can't be empty"});
            return false;
        }
        if(!description) {
            setPopup({active: true, title: "Oops!", 
                message: "Description can't be empty"});
            return false;
        }
        if(!maxHourlyEnergyConsumption) {
            setPopup({active: true, title: "Oops!", 
                message: "Consumption can't be empty"});
            return false;
        }
        return true;
    }

    const onSaveClick = async (e) => {
        e.preventDefault();
        let notEmpty = await validateInput();
        if (notEmpty) {
            fetch('http://localhost:8080/energyUtility/devices', {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    "Content-type": "application/json"
                },
                body: JSON.stringify({description, address, maxHourlyEnergyConsumption, clientUsername})
            })
            .then(response => response.json())
            .then(body => {
                if (body.success === false) {
                    setPopup({active: true, title: "Oops!", message: body.message});
                }
                else {
                    setPopup({active: true, title: "Yaay!", message: body.message});
                }
            });
        }
    }

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setClientUsername(value);
      };
   
    return(
        <div className='background'>
            <HeaderAdmin adminUsername={adminUsername}/>
            <div className='title'>
                <p className='title-text-device'>Add New Device</p>
            </div>
            <form className="new-device-form">
                <div className="device-data">
                    <label className="device-data-label">Address:</label>
                    <input
                        className="device-data-input" 
                        type="text" 
                        id="address"
                        placeholder="address"
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </div>
                <div className="device-data">
                    <label className="device-data-label">Description:</label>
                    <input
                        className="device-data-input" 
                        type="text"
                        id="description" 
                        placeholder="description"
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>
                <div className="device-data">
                    <label className="device-data-label">Max Hourly Consumption:</label>
                    <input
                        className="device-data-input" 
                        type="text"
                        id="consumption" 
                        placeholder="00.00"
                        value={maxHourlyEnergyConsumption} 
                        onChange={(e) => setMaxHourlyEnergyConsumption(e.target.value)} 
                    />
                </div>
                <div className="device-data">
                    <label className="device-data-label">Client:</label>
                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">Client</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            value={clientUsername}
                            onChange={handleChange}
                            input={<OutlinedInput label="Client" />}
                            MenuProps={MenuProps}
                        >
                        {clients.map((client) => (
                            <MenuItem
                                key={client.username}
                                value={client.username}
                                style={getStyles(client.username, clientName, theme)}
                                >
                                {client.username}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                <button 
                    className='btn-save-device' 
                    id='btn-save' 
                    type='submit'
                    onClick={(e) => onSaveClick(e)}
                >
                    Save        
                </button>  
            </form>

            <Popup 
                trigger={popup.active}
                setPopup={setPopup}
                title={popup.title}
                message={popup.message}
            />
    </div>
    )
}

export default NewDevicePage