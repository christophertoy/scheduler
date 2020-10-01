import React, { useState, useEffect } from "react";
import axios from 'axios';
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors.js";


// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2,
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];


// Appointment Data

// const appointments = [
  // {
  //   id: 1,
  //   time: "12pm",
  // },
  // {
  //   id: 2,
  //   time: "1pm",
  //   interview: {
  //     student: "Lydia Miller-Jones",
  //     interviewer: {
  //       id: 1,
  //       name: "Sylvia Palmer",
  //       avatar: "https://i.imgur.com/LpaY82x.png",
  //     }
  //   }
  // },
  // {
  //   id: 3,
  //   time: "2pm",
  // },
  // {
  //   id: 4,
  //   time: "3pm",
  // },
  // {
  //   id: 5,
  //   time: "4pm",
  // },
// ];

export default function Application(props) {
  // const [day, setDay] = useState("Monday");
  // const [days, setDays] = useState([]);

  const [state, setState] = useState({
    day:"Monday",
    days: [],
    appointments: {}
  });

 
const dailyAppointments = getAppointmentsForDay(state, state.day);

const setDay = day => setState({ ...state, day});
// const setDays = days => setState(prev => ({ ...prev, days }));

  // useEffect(()=> {
  //   axios.get('/api/days')
  //   .then((response) => {
  //     console.log(response.data)
  //     setDays(response.data)
  //   })
  // }, [])

  useEffect(() => {

    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments')
    ])
      .then((all) => {
        console.log(all[0])
        console.log(all[1])
        setState(prev => ({...prev, days: all[0].data, appointments: all[1].data}));
      })

  }, [])


  

  return (
    <main className="layout">
      <section className="sidebar">
        <img
  className="sidebar--centered"
  src="images/logo.png"
  alt="Interview Scheduler"
/>
<hr className="sidebar__separator sidebar--centered" />
<nav className="sidebar__menu">
<DayList
  days={state.days}
  day={state.day}
  setDay={setDay}
/>
</nav>
<img
  className="sidebar__lhl sidebar--centered"
  src="images/lhl.png"
  alt="Lighthouse Labs"
/>
      </section>
      <section className="schedule">
        {dailyAppointments.map (appointment => 
        <Appointment 
        key={appointment.id}
        // id={appointment.id}
        // time={appointment.time}
        // interview={appointment.interview}
        {...appointment}
        />   
        )}
        <Appointment key="last" time="5pm" />
        
      </section>
    </main>
  );
}
