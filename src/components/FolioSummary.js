import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MMDD from '../utils/formatDate';
import { 
    Autocomplete,
    Button,
    Grid,
    Card,
    Dialog,
    DialogContent,
    DialogActions,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    Radio,
    RadioGroup,
    FormLabel,
    FormControlLabel,
    FormControl,
    MenuItem,
    Paper,
    Select,
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

import TransactionsDialog from './TransactionsDialog';
import PostDialog from './PostDialog';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import dayjs from 'dayjs';




function FolioSummary({ reservation_id, reservation, fetchReservationData }) { 

    const [invoices, setInvoices] = useState(reservation.invoices);
    const [transactions, setTransactions] = useState(reservation.transactions);

    const totalPosted = () => {

        if (reservation.invoices) {
            const total = reservation.invoices.reduce(
                (accumulator, i) => accumulator + i.f1.total,
                0
              );
    

    
            return total;
        }

        return 0
    }


    const totalPaid = () => {

        if (reservation.invoices) {
            const total = reservation.invoices.reduce(
                (accumulator, i) => accumulator + i.f1.amount_paid,
                0
              );
    

    
            return total;
        }

        return 0
    }


    useEffect(() => {
        if (!Object.is(invoices, reservation.invoices)) {
          setInvoices(reservation.invoices);
        }
      }, [reservation.invoices]);
    
      useEffect(() => {
        if (!Object.is(transactions, reservation.transactions)) {
          setTransactions(reservation.transactions);
        }
      }, [reservation.transactions]);


    useEffect(() => {
        setInvoices(reservation.invoices);
    },[reservation_id])

    return (
        <Card>

            <Grid container direction="column"
                
            >
                <Grid item px={1}>
                    <Grid container justifyContent={'space-between'} py={1} alignItems="center" >
                        <Grid item>
                            Folio
                        </Grid>

                        <Grid item>
                            Current Total ${ totalPosted() }
                        </Grid>

                        <Grid item>
                            Total Paid ${ totalPaid() }
                        </Grid>

                        <Grid item>
                            <PostDialog reservation={reservation} reservation_id={reservation_id} fetchReservationData={fetchReservationData}/>
                            <TransactionsDialog reservation={reservation} reservation_id={reservation_id} fetchReservationData={fetchReservationData}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Card
                        variant="outlined"
                    >
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Folio</TableCell>
                                        <TableCell>Total ($)</TableCell>
                                        <TableCell>Amount Paid($)</TableCell>
                                        <TableCell>Remaining($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    invoices && invoices.map(i => 
                                        <TableRow
                                            key={i.f1.id}
                                        >
                                            <TableCell component="th" scope="row">
                                                { i.f2.type }
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                { i.f1.total }
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                { i.f1.amount_paid}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                { i.f1.total - i.f1.amount_paid}
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                                    <TableRow
                                        
                                    >
                                        {/* <TableCell component="th" scope="row">
                                            { i.f2.type }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { i.f1.total }
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            { i.f1.amount_paid}
                                        </TableCell> */}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </Grid>
            </Grid>
            
        </Card>
    );
  }
  
  export default FolioSummary;