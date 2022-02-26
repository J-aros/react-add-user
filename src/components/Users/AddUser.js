import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Entrada inválida",
        message: "Digite un nombre y edad válida (sin campos vacíos).",
      });
      return;
    }

    if (+enteredAge < 1) {
      setError({
        title: "Edad inválida",
        message: "Digite una edad válida (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const userNameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };
  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label>Usuario</label>
          <input
            type="text"
            value={enteredUsername}
            onChange={userNameChangeHandler}
          />
          <label>Edad</label>
          <input type="number" value={enteredAge} onChange={ageChangeHandler} />
          <Button type="submit">Agregar</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
