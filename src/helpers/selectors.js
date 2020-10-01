// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3]
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5]
//     }
//   ],
//   appointments: {
//     "1": { id: 1, time: "12pm", interview: null },
//     "2": { id: 2, time: "1pm", interview: null },
//     "3": {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 }
//     },
//     "4": { id: 4, time: "3pm", interview: null },
//     "5": {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 }
//     }
//   }
// };

// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export default function getAppointmentsForDay(state, day) {

const filteredDay = state.days.filter(selectedDay => selectedDay.name === day);

if (filteredDay.length === 0) {
  return [];
}

const appointments = filteredDay[0].appointments.map(appointment => {
  return state.appointments[appointment];
}) 

return appointments;

}

