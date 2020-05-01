import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: rgb(29, 155, 76);
`;
const Form = styled.form`
  text-align: center;
`;
const Text = styled.span`
  color: rgb(42, 42, 42);
  font-weight: bold;
`;
const Input = styled.input`
  text-align: center;
  margin: 0 0 20px 0;
`;
const SignUp = styled.button`
  text-align: center;
  border: 2px solid rgb(15, 15, 15);
  background-color: rgb(250, 179, 51);
  color: rgb(15, 15, 15);
  font-size: 1em;
  margin-left: 50px;
  font-weight: bold;
  &:hover {
    background-color: rgb(29, 155, 76);
    color: rgb(250, 179, 51);
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
  }
`;
const ToLogin = styled.button`
  text-align: center;
  border: 2px solid rgb(15, 15, 15);
  background-color: rgb(250, 179, 51);
  color: rgb(15, 15, 15);
  font-size: 1em;
  margin-left: 10%;
  font-weight: bold;
  padding-left: 20px;
  padding-right: 20px;
  &:hover {
    background-color: rgb(29, 155, 76);
    color: rgb(250, 179, 51);
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
  }
`;

const initialState = {
  username: "",
  password: "",
  isFetching: false,
};

const Login = () => {
  const [login, setLogin] = useState(initialState);
  const [userId, setUserId] = useState();
  const { push } = useHistory();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLogin({ ...login, isFetching: true });
    axiosWithAuth()
      .post("/api/auth/login", login)
      .then((res) => {
        console.log("You just logged in", res);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("userId", JSON.stringify(res.data.id));
        setUserId(res.data.id);
        push("/user-profile", userId);
      })
      .catch((err) => {
        console.log(err, "sorry, an error has occured while logging you in");
      });
  };

  return (
    <Wrapper>
      <Title>Customer Login</Title>
      <Form onSubmit={handleSubmit}>
        <Text>Username: </Text>
        <Input
          type="text"
          name="username"
          label="username"
          value={login.username}
          onChange={handleChange}
          placeholder="Username *"
        />
        <br />
        <Text>Password: </Text>
        <Input
          type="password"
          name="password"
          label="password"
          value={login.password}
          onChange={handleChange}
          placeholder="Password *"
        />
        <br />
        <ToLogin>Log in</ToLogin>
        {login.isFetching && "Please wait...logging you in"}
        <Link to="/signup">
          <SignUp>If you haven't registered yet, sign up here.</SignUp>
        </Link>
      </Form>
    </Wrapper>
  );
};

export default Login;
