import styled from "styled-components";
import React, { useState, useEffect } from "react";
import axios from "axios";

// api === 5f9b5173468219b4506afb6943fcc57b
export default function Home() {
  const [inputvalue, setinputvalue] = useState("");
  const [data, setdata] = useState(null);
  const eventHandler = (e) => {
    e.preventDefault();
    fetchapi();
  };
  const eventDiabled = inputvalue.length > 0 ? false : true;
  async function fetchapi() {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputvalue}&appid=5f9b5173468219b4506afb6943fcc57b`
    );
    await response
      .json()
      .then((res) => setdata(res))
      .catch((res) => console.log(res));
    setinputvalue("");
  }
  return (
    <div>
      <Mainwrapper>
        <Heading>
          <h1>Weather App</h1>
        </Heading>
        <Input
          placeholder="Enter City Name"
          type="text"
          value={inputvalue}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              fetchapi();
            }
          }}
          onChange={(e) => setinputvalue(e.target.value)}
        />
        <Button onClick={eventHandler} disabled={eventDiabled}>
          <h2>Submit</h2>
        </Button>
        <Mention style={{ paddingTop: "5px" }}>
          {eventDiabled == true ? (
            <p>Gimme Place Name</p>
          ) : (
            <p>Details fetching...</p>
          )}
        </Mention>
        <div>
          {data && (
            <Content>
              <h1>{data.name}</h1>
              <h2>{data.sys.country}</h2>
              <h2>{data.main.temp}</h2>
              <h3>
                {data.weather[0].main} : {data.weather[0].description}
              </h3>
              <h3>Wind Speed : {data.wind.speed}</h3>
            </Content>
          )}
        </div>
      </Mainwrapper>
    </div>
  );
}

const Mainwrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Heading = styled.section`
  color: blueviolet;
  background-color: black;
  height: 100px;
  width: 250px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
  &:hover {
    color: white;
    background-color: blueviolet;
  }
`;
const Input = styled.input`
  outline: none;
  color: blueviolet;
  background-color: black;
  font-size: 50px;
  height: 100px;
  margin: 0 auto;
  text-align: center;
`;
const Button = styled.button`
  outline: none;
  color: blueviolet;
  background-color: black;
  height: 60px;
  width: 220px;
  border-radius: 15px;
  border: none;
  margin: 10px auto;
  &:active {
    color: darkred;
    background-color: lightcoral;
  }
`;
const Mention = styled.h2`
  color: blueviolet;
  margin: 0 auto;
`;
const Content = styled.div`
  background-color: blanchedalmond;
  padding: 10px;
  text-align: center;
  height: 280px;
  width: 650px;
  border-radius: 20px;
  margin: 0 auto;
`;
