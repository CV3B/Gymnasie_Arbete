import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc  } from "firebase/firestore";
import { auth, db, logout } from "../../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Paper, Typography, Button } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import "./BookingsDisplay.css";


const columns = [
  { id: 'pBookedDate', label: 'Bokat datum', minWidth: 100 },
  { id: 'pName', label: 'Namn', minWidth: 100 },
  {
    id: 'pEmail',
    label: 'Email',
    // minWidth: 170,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'pMobileNumber',
    label: 'Mobilnummer',
    // minWidth: 170,
    // align: 'right',
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'pExtraInfo',
    label: 'Extra information',
    // minWidth: 110,
    // align: 'right',
    // format: (value) => value.toFixed(2),
  },
];

function createData(pBookedDate, pName, pEmail, pMobileNumber, pExtraInfo) {
  return { pBookedDate, pName, pEmail, pMobileNumber, pExtraInfo };
}

  


function BookingDisplay() {
  const [bookings, setBookings] = useState({});
  const [name, setName] = useState([]);
  const [email, setEmail] = useState([]);
  const [mobileNumber, setMobileNumber] = useState([]);
  const [bookedDate, setBookedDate] = useState([]);
  const [extraInfo, setExtraInfo] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = bookedDate.map((i, k) => {
    // return [bookedDate[k], name[k], email[k], mobileNumber[k], extraInfo[k]]
    return createData(bookedDate[k], name[k], email[k], mobileNumber[k], extraInfo[k])
  })


  const [user, loading, error] = useAuthState(auth);

  const fetchBookedData = async () => {
    try {
      const q = query(collection(db, "booked-dates"), where("date", "!=", ""))

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setBookings(prev => [prev, pDoc.data()])
        setName(prev => [...prev, pDoc.data().firstName +" "+ pDoc.data().lastName])
        setBookedDate(prev => [...prev, pDoc.data().date])
        setEmail(prev => [...prev, pDoc.data().email])
        setExtraInfo(prev => [...prev, pDoc.data().extraInfo])
        setMobileNumber(prev => [...prev, pDoc.data().mobileNumber])       
          
        console.log("AVILBLE BOOKINS", pDoc.data());
      });

    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
      if (loading) return;
      fetchBookedData()

      // errorAlert()
  }, [loading]);
  return(
    // Object.keys(bookings.map((bookedData) => (
    //   <Paper className="bookings-paper">
    //     <Typography>{bookings[bookedData]}</Typography>
    //     <Button onClick={()=> console.log(bookings)}>AAAAA</Button>
    //   </Paper>
    // ))
    // )
<>
{/* <Button onClick={()=> console.log(rows)}>aaaaaaaa</Button> */}
    {/* <List
      sx={{
        width: '100%',
        maxWidth: "100%",
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: "100%",
      }}
      subheader={<li />}
    > */}
      
      {/* {
        bookedDate.map((i, k) => (
          <ListItem>
          <Paper elevation={12} className="bookings-paper">
            <Typography>{bookedDate[k]}</Typography>
            <Typography>{name[k]}</Typography>
            <Typography>{email[k]}</Typography>
            <Typography>{mobileNumber[k]}</Typography>
            <Typography>{extraInfo[k]}</Typography>
    
            </Paper>
            </ListItem>

          ))
        }
      </List> */}

  <TableContainer sx={{ maxHeight: 440 }}>
  <Table stickyHeader aria-label="sticky table">
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{ minWidth: column.minWidth }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={row.pBookedDate}>
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format && typeof value === 'number'
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </TableBody>
  </Table>
  </TableContainer>
  <TablePagination
  rowsPerPageOptions={[10, 25, 100]}
  component="div"
  count={rows.length}
  rowsPerPage={rowsPerPage}
  page={page}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  />


  </>

      // bookedDate.map((i, k) => (
      //   <Paper elevation={12} className="bookings-paper">
    //     <Typography>{bookedDate[k]}</Typography>
    //     <Typography>{name[k]}</Typography>
    //     <Typography>{email[k]}</Typography>
    //     <Typography>{mobileNumber[k]}</Typography>
    //     <Typography>{extraInfo[k]}</Typography>

    //   </Paper>
    // ))
    
    // <div>
    //   <Button onClick={()=> console.log(bookedDate)}>AAAAA</Button>
    // </div>
  )
}

export default BookingDisplay;