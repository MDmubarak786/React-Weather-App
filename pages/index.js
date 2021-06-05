import styled from "styled-components";
import React, { useState } from "react";

export default function Home() {
  const [inputvalue, setinputvalue] = useState("");
  const eventHandler = (e) => {
    e.preventDefault();

    console.log(inputvalue);
    setinputvalue("");
  };
  const eventDiabled = inputvalue.length > 0 ? false : true;

  return (
    <div>
      <Heading>
        <h1>Weather App</h1>
      </Heading>
      <Input
        type="text"
        value={inputvalue}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            console.log(inputvalue);
            setinputvalue("");
          }
        }}
        onChange={(e) => setinputvalue(e.target.value)}
      />
      <Button onClick={eventHandler} disabled={eventDiabled}>
        <h2>Submit</h2>{" "}
        <h2 style={{ paddingTop: "5px" }}>
          {eventDiabled == true ? (
            <p>Gimme Place Name</p>
          ) : (
            <p>Details fetching...</p>
          )}
        </h2>
      </Button>
    </div>
  );
}

const Heading = styled.section`
  color: blueviolet;
  background-color: black;
  text-align: center;
  height: 100px;
  width: 250px;
  border-radius: 20px;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-left: 45%;
  margin-top: 10px;
  &:hover {
    color: white;
    background-color: blueviolet;
  }
`;
const Input = styled.input`
  display: block;
  margin-left: 38%;
  margin-top: 10px;
  outline: none;
  color: blueviolet;
  background-color: black;
  font-size: 50px;
  height: 100px;
  width: 30%;
  text-align: center;
  
`;
const Button = styled.button`
  display: block;
  margin-left: 46%;
  margin-top: 10px;
  outline: none;
  color: blueviolet;
  background-color: black;
  height: 60px;
  width: 220px;
  text-align: center;
  border-radius: 15px;
  outline: none;
  border: none;
  &:active {
    color: darkred;
    background-color: lightcoral;
  }
`;
