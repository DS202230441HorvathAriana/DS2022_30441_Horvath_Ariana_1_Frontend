import { Navigate, useNavigate } from "react-router-dom";
import React from 'react';
import { useState, useEffect } from "react";
import "./../css/MyDevicePage.css"; 
import {useLocation} from "react-router-dom"
import HeaderClient from "./HeaderClient";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import ReactApexChart from 'react-apexcharts'
import SockJsClient from 'react-stomp'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const MyDevicePage = () => {

    const navigate = useNavigate();
    const {state} = useLocation();
    const clientUsername = state.clientUsername;
    const device = state.device;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [date, setDate] = useState("");
    const [consumptions, setConsumptions] = useState([]);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    var consumValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    var chartConfig = {
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: hours
          }
        },
        series: [
          {
            name: "Energy Consumption",
            data: consumValues
          }
        ]
    };
    var [stateChart, setStateChart] = useState(chartConfig);
    const SOCKET_URL = 'http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/ws-message';

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const onShowClick = async (e) => {
        e.preventDefault();
        const dateStr = Moment(selectedDate).format('YYYY-MM-DD');
        
        fetch(`http://arianahorvath30441backend.germanywestcentral.azurecontainer.io:8080/energyUtility/consumptions/${device.meteringDeviceId}/${dateStr}`)
            .then(response => response.json())
            .then(body => {
                console.log(body);
                setConsumptions(body);

                body.forEach(consumption => {
                    const hour = consumption?.time?.substr(0, 2);
                    if (hour) {
                        const intHour = parseInt(hour, 10);
                        consumValues[intHour] = consumption.energyConsumption;
                    }
                })
                console.log(consumValues);
                setStateChart(chartConfig);
            });
    }
 
    let onMessageReceived = (msg) => {
        if (msg.deviceId === device.meteringDeviceId) {
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
            <label className='my-devices-title'>Energy Metering Device {device.meteringDeviceId}</label>
            <div className='date'>
                <p className='message'>Select date to see chart: </p>
                <DatePicker className='date-picker' selected={selectedDate} onChange={(date) => setSelectedDate(date)}
                            onSelect={(date) => setDate(date.toLocaleDateString())}/>
            </div>
            <button 
                className='btn-show' 
                id='btn-show-2' 
                type='submit'
                onClick={(e) => onShowClick(e)}>
                Show      
            </button>
            <div id="chart">
                <ReactApexChart options={stateChart.options} series={stateChart.series} type="bar" height={500} width={750} />
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

export default MyDevicePage