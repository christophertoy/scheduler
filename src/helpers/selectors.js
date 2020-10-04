
export function getAppointmentsForDay(state, day) {

const filteredDay = state.days.filter(selectedDay => selectedDay.name === day);

if (filteredDay.length === 0) {
  return [];
}

const appointments = filteredDay[0].appointments.map(appointment => {
  return state.appointments[appointment];
}) 

return appointments;

}

export function getInterviewersForDay(state, day) {

  // Find the right day
  const filteredDay = state.days.filter(selectedDay => selectedDay.name === day);

  
  if (filteredDay.length === 0) {
    return [];
  }
  
  // Return array with all the interviewer objects of that day
  const mappedInterviewers = filteredDay[0].interviewers.map(interviewerID => {
    return state.interviewers[interviewerID];
   
  })
 
  return mappedInterviewers

}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewObj = { student: interview.student }

  interviewObj.interviewer = state.interviewers[interview.interviewer]

  return interviewObj


}

