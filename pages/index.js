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
        <Wrapper>
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
        </Wrapper>
      </div>
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
const Mention = styled.h2`
  color: blueviolet;
  text-align: center;
  margin-left: 7%;
`;
const Content = styled.div`
  background-color: blanchedalmond;
  padding: 20px;
  text-align: center;
  height: 350px;
  width: 850px;
  border-radius: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
