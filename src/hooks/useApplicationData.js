import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData(initial) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .put(`/api/appointments/${id}`, {interview})
      .then((res) => {
        setState({...state, appointments});
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios
      .delete(`/api/appointments/${id}`) 
      .then((res) => {
        setState({...state, appointments})
      })
  }

  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    const getDays = "/api/days";
    const getAppointments = "/api/appointments";
    const getInterviewers = "/api/interviewers";
    Promise.all([
      axios.get(getDays),
      axios.get(getAppointments),
      axios.get(getInterviewers)
    ]).then(([{data: days}, {data: appointments}, {data: interviewers}]) => {
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}


