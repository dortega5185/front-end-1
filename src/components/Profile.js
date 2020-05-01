import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUserInfo, deleteUser } from "../actions";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 1.7em;
  text-align: center;
  color: rgb(29, 155, 76);
`;

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Details = styled.p`
  color: rgb(42, 42, 42);
  font-weight: bold;
`;
const Clicker = styled.button`
  //   text-align: center;
  border: 2px solid rgb(15, 15, 15);
  background-color: rgb(250, 179, 51);
  color: rgb(15, 15, 15);
  font-size: 1em;
  margin-left: 10px;
  font-weight: bold;
  &:hover {
    background-color: rgb(29, 155, 76);
    color: rgb(250, 179, 51);
    border-radius: 10px;
    transition: all ease-in-out 0.3s;
  }
`;

const Profile = () => {
  const id = localStorage.getItem("userId");
  const { push } = useHistory();
  const user = useSelector((state) => state.userReducer.singleUser);
  const dispatch = useDispatch();
  console.log("this is useselector", user);

  useEffect(() => {
    dispatch(getUserInfo(id));
  }, []);

  return (
    <Wrapper className="profile">
      <Title>Account Details</Title>
      <Details>Name: {user.name}</Details>
      <Details>Username: {user.username}</Details>
      <Details>
        Password:
        <Link to="/change-password">
          <Clicker>Change Password</Clicker>
        </Link>
      </Details>
      <Details>
        Delete Account:
        <Clicker
          className="delete"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteUser(user));
            localStorage.clear();
            push("/");
          }}
        >
          Delete this Account
        </Clicker>
      </Details>
    </Wrapper>
  );
};

export default Profile;
