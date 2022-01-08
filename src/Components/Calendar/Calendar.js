import React, {useState, useEffect} from 'react';
import dayjs from "dayjs";
import "./Calendar.css";
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { Button, CardActionArea, Paper } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import Booking, { OpenBooking } from './Booking/Booking';

import { collection, query, where, getDocs, getDoc, doc, updateDoc, addDoc  } from "firebase/firestore";

import { auth, db, logout } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const weekday = require("dayjs/plugin/weekday");
const weekOfYear = require("dayjs/plugin/weekOfYear");

dayjs.extend(weekday);
dayjs.extend(weekOfYear);


function Calendar(props) {

  let currentMonthDays;
  let previousMonthDays;
  let nextMonthDays;
  
  const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const TODAY = dayjs().format("YYYY-MM-DD");
  const INITIAL_YEAR = dayjs().format("YYYY");
  const INITIAL_MONTH = dayjs().format("M");
  const CURRENT_MONTH = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1)).format("MMMM YYYY")
  const [user, loading, error] = useAuthState(auth);
  const [selectedMonth, setMonth] = useState(CURRENT_MONTH);
  const [bz, setBz] = useState("pres");

  const [value, setValue] = useState([null, null]);
  const [availbleDates, setAvailbleDates] = useState([])
  // const [calendarDaysElement, setCalendarDaysElement] = useState("");

  const fetchAvailableDatesData = async () => {
    try {
      const q = query(collection(db, "available-dates"), where("date", "!=", "")); // TODO fixa så att den hittar rätt dagar.
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setAvailbleDates(prev => [...prev, pDoc.data().date])
      });
  
    } catch (err) {
      console.error(err);
      // alert("An error occured while fetching user data");
    }
  };

  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    // const calendarDaysElement = document.getElementById("calendar-days");
    // removeAllDayElements();

    
  
    currentMonthDays = createDaysForCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    );
  
    previousMonthDays = createDaysForPreviousMonth(year, month);
  
    nextMonthDays = createDaysForNextMonth(year, month);
  
    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
      
    console.log("Created Calendar")
    
    
    function isValidDay(currDate) {
      // fetchAvailableDatesData(currDate)
      let arrValidDays = [];
    
      // for (const numDays in validDays) {
    
        // const date1 = dayjs(dateFrom)
        // const date2 = dayjs(dateTo)
        // const dateDiff = date2.diff(date1, "day")
        
        // for (let i=0; i < availbleDates + 1; i++) {
        //   arrValidDays.push(availbleDates)
        //   // console.log("daa",availbleDates[i]);
        //   // console.log("a")
        // }
      // }
      // let getValidDays = await (availbleDates !== undefined ? true : false) 
      const getValidDays = availbleDates.some(day => day === currDate)
      // console.log(getValidDays)
      // if(getValidDays) console.log(getValidDays)
      // console.log("yaa", availbleDates)
      // console.log(getValidDays)
      // return getValidDays
      // console.log("k",arrValidDays)
      // if(availbleDates === undefined) break;
      return getValidDays
      // if(availbleDates === currDate) return true;
      // else return false;
    }

    return(
      days.map((day) => (
        <Paper elevation={12} ><li id={day.date} className={`calendar-day ${!day.isCurrentMonth ? "calendar-day--not-current" : ""} ${(day.date === TODAY) ? "calendar-day--today" : ""} ${isValidDay(day.date) ? "test2": ""} `}>
            <span><Typography variant='subtitle1' >{day.dayOfMonth}</Typography></span>
            {/* <Booking day={day.date} /> */}
            {isValidDay(day.date) &&
              // <Button id={day.date} onClick={(e) => console.log(typeof e.target.id)}>
              //   BOKA
              // </Button>
              
              <OpenBooking date={day.date} />
              
            }
            {/* <button id={day.date} onClick={(e) => console.log(day)} /> */}
            {/* <button id={day.toString()} onClick={(e) => console.log(day)} /> */}
            
          </li></Paper>
      ))
    )
  };
  
  function getNumberOfDaysInMonth(year, month) {
    return dayjs(`${year}-${month}-01`).daysInMonth();
  }
  
  function createDaysForCurrentMonth(year, month) {
    return [...Array(getNumberOfDaysInMonth(year, month))].map((day, index) => {
      return {
        date: dayjs(`${year}-${month}-${index + 1}`).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: true
      };
    });
  }

  function getWeekday(date) {
    return dayjs(date).weekday();
  }

  function createDaysForPreviousMonth(year, month) {
    const firstDayOfTheMonthWeekday = getWeekday(currentMonthDays[0].date);
  
    const previousMonth = dayjs(`${year}-${month}-01`).subtract(1, "month");
  
    // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
    const visibleNumberOfDaysFromPreviousMonth = firstDayOfTheMonthWeekday
      ? firstDayOfTheMonthWeekday - 1
      : 6;
  
    const previousMonthLastMondayDayOfMonth = dayjs(currentMonthDays[0].date)
      .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
      .date();
  
    return [...Array(visibleNumberOfDaysFromPreviousMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${previousMonth.year()}-${previousMonth.month() + 1}-${
            previousMonthLastMondayDayOfMonth + index
          }`
        ).format("YYYY-MM-DD"),
        dayOfMonth: previousMonthLastMondayDayOfMonth + index,
        isCurrentMonth: false
      };
    });
  }

  function createDaysForNextMonth(year, month) {
    const lastDayOfTheMonthWeekday = getWeekday(
      `${year}-${month}-${currentMonthDays.length}`
    );
  
    const nextMonth = dayjs(`${year}-${month}-01`).add(1, "month");
  
    const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
      ? 7 - lastDayOfTheMonthWeekday
      : lastDayOfTheMonthWeekday;
  
    return [...Array(visibleNumberOfDaysFromNextMonth)].map((day, index) => {
      return {
        date: dayjs(
          `${nextMonth.year()}-${nextMonth.month() + 1}-${index + 1}`
        ).format("YYYY-MM-DD"),
        dayOfMonth: index + 1,
        isCurrentMonth: false
      };
    });
  }


  function setPrevMonth() {
    setMonth(dayjs(selectedMonth).subtract(1, "month").format("MMMM YYYY"));
    setBz("prev")
    // createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
  }

  function setPresMonth() {
    setMonth(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)).format("MMMM YYYY"));
    setBz("pres")
    // createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
  }

  function setNextMonth() {
    setMonth(dayjs(selectedMonth).add(1, "month").format("MMMM YYYY"));
    setBz("next")
    // createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
  }

  function aa() {
    if (bz === "prev") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    } 
    else if (bz === "pres") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    } 
    else if (bz === "next") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    }
  }

  useEffect(() => {
    fetchAvailableDatesData()
  }, []);
    return (
        <Paper elevation={12} className="calendar-month">

          <section className="calendar-month-header">
            <Typography variant='h5' id="selected-month" className="calendar-month-header-selected-month">
                {selectedMonth}
            </Typography>

            {user && props.editMode ? 
              (<Booking value={value} setValue={setValue} />) : null
            }
            


            <section className="calendar-month-header-selectors">
              <IconButton id="previous-month-selector" onClick={() => setPrevMonth()}><ChevronLeftIcon /></IconButton>
              <IconButton id="present-month-selector" onClick={() => setPresMonth()}><KeyboardArrowDownIcon /></IconButton>
              <IconButton id="next-month-selector" onClick={() => setNextMonth()}><ChevronRightIcon /></IconButton>
            </section>

          </section>
        
          <ol id="days-of-week" className="day-of-week">
            {WEEKDAYS.map((weekday) => (
              <li><Typography variant='h6' >{weekday}</Typography></li>
            ))} 
          </ol>
        
          <ol id="calendar-days" className="days-grid">
            {aa()}
          </ol>
          
        </Paper>
)};






const validDays = {
  1: {
    dateFrom: "2021-11-13",
    dateTo: "2021-11-16",
    numOfSpots: 10,

  }
}



// export isValidDay();

export default Calendar;