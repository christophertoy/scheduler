import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRMING";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

const Appointment = (props) => {
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch((error) => {
        console.log(error);
        transition(ERROR_SAVE, true);
      });
  }

  function confirmDelete() {
    transition(CONFIRM);
  }

  function deleteAppt() {
    transition(DELETING, true);
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((error) => {
        console.log(error);
        transition(ERROR_DELETE, true);
      });
  }

  function editInterview() {
    transition(EDIT);
  }

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />

      {/* {props.interview ? 
      <Show student={props.interview.student} 
      interviewer={props.interview.interviewer.name}/> : <Empty />} */}

      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDelete}
          onEdit={editInterview}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onEdit={editInterview}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING && <Status message="Deleting" />}
      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you want to delete???"
          onCancel={back}
          onConfirm={deleteAppt}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === ERROR_SAVE && <Error message="Error Saving" onClose={back} />}
      {mode === ERROR_DELETE && (
        <Error message="Error Deleting" onClose={back} />
      )}
    </article>
  );
};

export default Appointment;
