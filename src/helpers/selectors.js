
export function getAppointmentsForDay(state, day) {
  const foundDays = state.days.find(dayObj => dayObj.name ===  day);
  if (state.days.length === 0 || !foundDays) {
    return [];
  }
  const filterAppointments = foundDays.appointments.map((id) => {
    return state.appointments[id]
  })
  return filterAppointments;
};

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const interviewerId = interview.interviewer;
  const foundInterview = state.interviewers[interviewerId];
  
  if(!foundInterview) {
    return null;   
  }

  return {interviewer: foundInterview,
          student: interview.student};
}

export function getInterviewersForDay(state, day) {
  const foundDays = state.days.find(dayObj => dayObj.name ===  day);
  if (state.days.length === 0 || !foundDays) {
    return [];
  }
  const filterInterviewers = foundDays.interviewers.map((id) => {
    return state.interviewers[id]
  })
  return filterInterviewers;

};
