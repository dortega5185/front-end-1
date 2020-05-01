import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const initialValue = {
  name: "",
  lastname: "",
  username: "",
  password: "",
};

const SignUp = () => {
  const [formValues, setFormValues] = useState(initialValue);
  const { push } = useHistory();

  const onInputChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(
        "https://bw-african-marketplace-lucas.herokuapp.com/api/auth/register",
        formValues
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        push("/");
      })
      .catch((err) => {
        console.log(
          err,
          "sorry, an error has occured while registering you in"
        );
      });
  };

  return (
    <>
      <h1>Register your Account</h1>
      <form className="signup" onSubmit={handleSubmit}>
        Name:
        <input
          type="text"
          name="name"
          label="name"
          value={formValues.name}
          onChange={onInputChange}
          placeholder="name"
          id="name"
        />
        <br />
        Username:
        <input
          type="text"
          name="username"
          label="username"
          value={formValues.username}
          onChange={onInputChange}
          placeholder="username"
          id="username"
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          label="password"
          value={formValues.password}
          onChange={onInputChange}
          placeholder="password"
          id="password"
        />
        <br />
        <button>Create Account</button>
      </form>
    </>
  );
};

export default SignUp;
