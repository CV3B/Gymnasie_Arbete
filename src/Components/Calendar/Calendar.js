import React, {useState, useEffect} from 'react';

//* MUI imports *//
import { Paper, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

//* Firebase imports *//
import AlertBar from "../Firebase/Firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

//* Other imports *//
import dayjs from "dayjs";
import Booking, { OpenBooking } from './Booking/Booking';

//* CSS imports *//
import "./Calendar.css";

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
  const CURRENT_MONTH = dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1)).format("MMMM YYYY");

  const [user, loading, error] = useAuthState(auth);
  const [selectedMonth, setMonth] = useState(CURRENT_MONTH);
  const [calendarState, setCalendarState] = useState("pres");
  const [alertOpen, setAlertOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [value, setValue] = useState([null, null]);
  const [availbleDates, setAvailbleDates] = useState([]);

  const fetchAvailableDatesData = async () => {
    try {
      const q = query(collection(db, "available-dates"), where("date", "!=", ""));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((pDoc) => {
        setBackdropOpen(true);
        setAvailbleDates(prev => [...prev, pDoc.data().date]);
      });

      setBackdropOpen(false);
  
    } catch (err) {
      console.error(err);
      setAlertOpen(true);

    }
  };

  function createCalendar(year = INITIAL_YEAR, month = INITIAL_MONTH) {
    currentMonthDays = createDaysForCurrentMonth(
      year,
      month,
      dayjs(`${year}-${month}-01`).daysInMonth()
    );
  
    previousMonthDays = createDaysForPreviousMonth(year, month);
  
    nextMonthDays = createDaysForNextMonth(year, month);
  
    const days = [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
      
    // console.log("Created Calendar")
    
    //* Sant eller falskt, om datumet är ett tillgängligt datum(tillgänliga datum är datum som har lagts till via "Booking.js") *//
    function isValidDay(currDate) {
      const getValidDays = availbleDates.some(day => day === currDate);
      
      return getValidDays;
    }

    return(
      days.map((day) => (
        <Paper key={day.date} elevation={window.matchMedia("(max-width: 600px)").matches ? 0 : 10} ><li id={day.date} className={`calendar-day ${!day.isCurrentMonth ? "calendar-day--not-current" : ""} ${(day.date === TODAY) ? "calendar-day--today" : ""} ${isValidDay(day.date) ? "bookableDay": ""} `}>
            <span><Typography variant='subtitle1' >{day.dayOfMonth}</Typography></span>
            {isValidDay(day.date) &&
              <OpenBooking date={day.date} />
            }
          </li>
        </Paper>
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
    setCalendarState("prev");
  }

  function setPresMonth() {
    setMonth(dayjs(new Date(INITIAL_YEAR, INITIAL_MONTH - 1, 1)).format("MMMM YYYY"));
    setCalendarState("pres");
  }

  function setNextMonth() {
    setMonth(dayjs(selectedMonth).add(1, "month").format("MMMM YYYY"));
    setCalendarState("next");
  }

  //* Flyttar sig mellan alla olika månadern i kalendern *//
  function handleCalendar() {
    if(calendarState === "prev") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    } 
    else if(calendarState === "pres") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    } 
    else if(calendarState === "next") {
      return createCalendar(dayjs(selectedMonth).format("YYYY"), dayjs(selectedMonth).format("M"));
    }
  }

  useEffect(() => {
    fetchAvailableDatesData();
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
              <li key={weekday} ><Typography variant='h6' >{weekday}</Typography></li>
            ))} 
          </ol>
          <ol id="calendar-days" className="days-grid">
            {handleCalendar()}
          </ol>

          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdropOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <AlertBar message={"An error occured while fetching data"} open={alertOpen} setOpen={setAlertOpen} />
        </Paper>
)};

export default Calendar;