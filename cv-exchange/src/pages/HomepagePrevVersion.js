import React, { useContext } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { AuthContext } from "../App";
import axios from "axios";

const BASE_URL = "https://console-us1.kaleido.io/api/v1";
const API_KEY = "u0wcj1gb0l-wTxyb3Dd4olAytzrlBnFxF1pfA5fZ42CCNFP1VMAgHs="; // or u0nj6cdo0o-6yRRQn7w9mQ3VVaefIbOhDhoYncVuDCCdWHvQ8NVq04=
const CONSORTIUM = "u1t7x2kodf";
const ENVIRONMENT = "u1v1m5req8";
const NODE1 = "u1k1jle77o";
const HDR_AUTH = "Authorization: Bearer " + API_KEY;
const HDR_CT = "Content-Type: application/json";

const Homepage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const callapi = async () => {
    // await fetch(
    //   "https://u1v1m5req8-u1k1jle77o-connect.us1-azure.kaleido.io/gateways/simplestoragetesting/?kld-from=hd-u1xfys4q2b-tjgp6joq-0&kld-sync=true", // if there is more than one instance for the same contract, the instance id need to be specified
    //   {
    //     method: "POST",
    //     headers: {
    //       accept: "application/json",
    //       "Content-Type": "application/json",
    //       Authorization:
    //         "Basic dTFkNnk4d3JqZDpFSUV4N0pHTkVSV0s4V1NCbjFyTWQyaF9OYWZNUF9KWlAxa1M2LXBqSnpF",
    //     },
    //     // body: '{\n  "initVal": "125"\n}',
    //     body: JSON.stringify({ initVal: "125" }),
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    //   .catch((error) => console.error(error));

    fetch(BASE_URL + "/consortia", {
      // mode: "no-cors",
      // credentials: "include",
      method: "GET",
      headers: {
        // "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
        // "Access-Control-Request-Method": "GET",
        // "Access-Control-Request-Headers": "Content-Type, Authorization",
        Authorization: "Bearer " + { API_KEY },
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    const resp = await axios.get(BASE_URL + "/consortia", {
      // mode: "no-cors",
      // credentials: "include",
      // withCredentials: false,
      headers: {
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Request-Method": "GET",
        // "Access-Control-Request-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Authorization: "Bearer " + { API_KEY },
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log(resp);
  };
  return (
    <div>
      <h1>Your are {auth || "unknown"}</h1>
      <Button onClick={() => callapi()}>call api</Button>
      <DropdownButton title="Change your identity">
        {[
          "Candidate Alice",
          "Candidate Bob",
          "Company X",
          "Company Y",
          "Company Z",
          "Sprint Milestone",
        ].map((identity) => (
          <Dropdown.Item onClick={() => setAuth(identity)}>
            {identity}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
};

export default Homepage;
