import React, { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];

    for (const index in days) {
      const day = days[index];

      for (const apptID of day.appointments)
        if (apptID === id) {
          days[index] = { ...day, spots: day.spots + 1 };
        }
    }

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
      console.log("deleted successfully");
    });
  }

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = [...state.days];
    for (const index in days) {
      const day = days[index];

      for (const apptID of day.appointments)
        if (apptID === id && state.appointments[id].interview === null) {
          days[index] = { ...day, spots: day.spots - 1 };
        }
    }

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then((response) => {
        console.log("added sucessfully");
        setState({ ...state, appointments, days });
      });
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
};

export default useApplicationData;
