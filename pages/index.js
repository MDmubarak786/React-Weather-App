import styled from "styled-components";
import React, { useState, useEffect } from "react";

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

    console.log(data);
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
          {data && data.cod === 200 && (
            <Content>
              <h1>Weather in {data.name}</h1>
              {/* <h2>{data.sys.country}</h2> */}
              <h2>{data.main.temp}</h2>
              {
                <img
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="image-api"
                  height="60px"
                  width="60px"
                />
              }
              <h5>{data.weather[0].description}</h5>
              <h5>Wind Speed : {data.wind.speed}</h5>
            </Content>
          )}
          {data && data.cod != 200 && (
            <Content>
              <h1>Give The Correct City Name</h1>
              <h2>or</h2>
              <h1>Check the Spell</h1>
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
  border: none;
  border-radius: 15px;
  &:focus {
    border: 1px solid lightcoral;
  }
`;
const Button = styled.button`
  outline: none;
  color: blueviolet;
  background-color: #ffffff;
  height: 60px;
  width: 220px;
  border-radius: 15px;
  border: none;
  margin: 10px auto;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);
  &:active {
    color: darkred;
    background-color: lightcoral;
  }
  &:hover {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
      0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);
    transform: scale(1.1, 1.1);
  }
`;
const Mention = styled.h2`
  color: linen;
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
