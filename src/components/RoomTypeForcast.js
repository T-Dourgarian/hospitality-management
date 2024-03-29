import './Nav.css';
import Grid from '@mui/material/Grid'; // Grid version 1
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import Link from '@mui/material/Link';
import { 
    Button,
    Paper,
    TableRow,
    TableHead,
    TableContainer,
    TableCell,
    TableBody,
    Table,
    TextField
} from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Outlet, Link as RouterLink } from "react-router-dom";
import { TypeSpecimenRounded } from '@mui/icons-material';


// function goToArrivals() {
    
// } 

function RoomTypeForcast() {

    const [weekOfDates, setWeekOfDates] = useState(() => {
        let dateArray = [];
        let date = new Date();

        for(let i = 0; i < 5; i++) {
            dateArray.push(date.toISOString().split('T')[0]);
            date.setDate(date.getDate() + 1)
        }

        return dateArray;
    });

    const [bookedInventory, setBookedInventory] = useState(null);
    const [totalInventory, setTotalInventory] = useState([]);
    const [roomTypes, setRoomTypes] = useState(null);

    const getInventoryData = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/room/inventory`, {
                dateArray: weekOfDates
            }) 

            setBookedInventory(data.bookedInventory);
            setTotalInventory(data.totalInventory);
            setRoomTypes(data.roomTypes);

            console.log('data.bookedInventory', data.bookedInventory)
    
        } catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getInventoryData();

    }, [])


  return (
    <Grid container direction="column" spacing={2} pt={4}>


            <Grid item width="100%">
                <TableContainer component={Paper}>
                    <Table size="small" aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Date
                                </TableCell>
                                {
                                    roomTypes && roomTypes.map(type => 
                                        <TableCell key={type.id}>
                                            { type.name_short }
                                        </TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>

                            {
                                weekOfDates[0] && weekOfDates.map(date => 
                                    <TableRow
                                        key={date}
                                    >
                                        <TableCell  scope="row">
                                            { date }
                                        </TableCell>
                                        {    
                                            
                                            roomTypes && roomTypes.map(roomType => {
                                                
                                                
                                                    const matchingType = bookedInventory[date].find(type => type.id == roomType.id)
                                                    const totalInventoryType = totalInventory.find(inventoryType => inventoryType.id == roomType.id)
                                                    
                                                    if (matchingType) {

                                                        return (
                                                            <TableCell
                                                                key={date + roomType.id}
                                                                sx={{
                                                                    color: (totalInventoryType.count - matchingType.count >= 0) ? 'green' : 'red'
                                                                }}
                                                            >
                                                                {totalInventoryType.count - matchingType.count}
                                                            </TableCell>
                                                        )
                                                    } else {
                                                        return (
                                                            <TableCell
                                                                key={date + roomType.id}
                                                                sx={{
                                                                    color: 'green'
                                                                }}
                                                            >
                                                                { totalInventoryType.count }
                                                            </TableCell>
                                                        )
                                                    }
                                            

                                            })
                                            
                                            
                                        }  
                                    </TableRow>    
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
  );
}

export default RoomTypeForcast;
