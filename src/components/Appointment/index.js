import React from 'react';
import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";


import "components/Application.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVE";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING, true);
    props
    .bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true))
  }

  function onDelete() {
    transition(DELETING, true)
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
  }

  function edit() {
    transition(EDIT)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onSave={save} onEdit={edit} onCancel={() => back(SHOW)}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === SHOW && (
        <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onEdit={edit}
            onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CONFIRM && 
      <Confirm 
        message="Are you sure you would like to delete?"
        onConfirm={onDelete}
        onCancel={() => back(EMPTY)} 
      />}
      {mode === EDIT && 
      <Form
        student={props.interview.student}
        interviewers={props.interviewers}
        interviewer={props.interview.interviewer.id}
        onSave={save}
        onCancel={() => back(SHOW)}
      />}
      {mode === ERROR_SAVE && <Error message="Could not save appointment." onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment." onClose={() => back()}/>}
    </article>
  )
}
