import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MMDD from '../utils/formatDate';
import { 
    Button,
    Grid,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    TextField,
    Tabs,
    TabPanel,
    Tab,
    Box,
    Typography
} from '@mui/material';

import ReservationTable from './ReservationsTable';


function FrontDesk() {


    const [value, setValue] = React.useState(0);
    const [arrivals, setArrivals] = useState([]);
    const [inHouse, setInHouse] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [roomList, setRoomList] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);


    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && (
              <Box >
                { children }
              </Box>
            )}
          </div>
        );
      }

      const getArrivals = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reservation/arrivals`);

        setArrivals(response.data)
      }

      const getInHouse = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reservation/inhouse`);

        setInHouse(response.data)
      }

      const getDepartures = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/reservation/departures`);

        setDepartures(response.data)
      }

      const getRoomList = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/room/all`);
        setRoomList(response.data)
  
      }

      const getRoomTypeList = async () => {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/roomType`);
  
        setRoomTypes(response.data);
      }

      useEffect(() => {
        getArrivals();
        getInHouse();
        getDepartures();
        getRoomList();
        getRoomTypeList();
      },[])
      
  

    return (
        <Grid container direction="column" spacing={2} pt={2}>
            <Grid item width="100%">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
                      <Tab label="Arrivals" />
                      <Tab label="In House"  />
                      <Tab label="Departures"  />
                    </Tabs>
                </Box >
                <TabPanel value={value} index={0}>
                    <ReservationTable getReservations={getArrivals} reservations={arrivals} getRoomList={getRoomList} roomList={roomList} roomTypes={roomTypes}/>                    
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ReservationTable getReservations={getInHouse} reservations={inHouse} getRoomList={getRoomList} roomList={roomList} roomTypes={roomTypes}/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                   <ReservationTable getReservations={getDepartures} reservations={departures} getRoomList={getRoomList} roomList={roomList} roomTypes={roomTypes}/>
                </TabPanel>
            </Grid>
        </Grid>
    );
  }
  
  export default FrontDesk;