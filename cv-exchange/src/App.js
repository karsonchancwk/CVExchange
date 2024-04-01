import React, { useState, createContext } from "react";
import {
  Container,
  Button,
  OverlayTrigger,
  Popover,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserProvider, parseEther, Contract, computeAddress } from "ethers";

import Homepage from "./pages/Homepage";
import AgileSoteria from "./assets/AgileSoteria.png";

import "./App.css";

export const AuthnProvContext = createContext(null);
export const BACKEND_URL = "http://localhost:5000";

function App() {
  const [provider, setProvider] = useState();
  const [auth, setAuth] = useState();

  // const callAPI = async () => {
  //   const result = await axios.post(BACKEND_URL + "/api/status", {
  //     dataa: "hihihi",
  //   });
  //   console.log(result?.data);
  // };

  const sendTx = async () => {
    const signer = await provider.getSigner();
    const transactionHash = await signer.sendTransaction({
      to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      value: parseEther("5"),
    }); // not working very working
    console.log(transactionHash);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <AuthnProvContext.Provider
          value={{ auth, setAuth, provider, setProvider }}
        >
          <Container>
            {/* Header */}
            <div
              className="d-flex justify-content-between align-items-center px-3 py-2"
              style={{ width: "inherit" }}
            >
              <img src={AgileSoteria} className="me-auto" height={65} />

              <p>You are not yet logged in</p>
              {/* <Button variant="link" onClick={() => connectMetamask()}>
                Connect{provider && "ed"} to Metamask
              </Button>

              <Button variant="link" onClick={() => connectMetamask()}>
                Resume Explorer
              </Button> */}

              {/* <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={regAccPopover}
              >
                <Button variant="light">Register your Metamask account</Button>
              </OverlayTrigger> */}

              {/* <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={uploadCVPopover}
              >
                <Button variant="dark">Upload your Resume</Button>
              </OverlayTrigger> */}
            </div>
            <Routes>
              <Route path="/" exact element={<Homepage />} />
              {/* <Route path="/pagetwo" exact element={<PageTwo />} />  <Route path="/AddRemoveParti" exact element={<AddRemoveParti />} /> */}
            </Routes>
          </Container>
        </AuthnProvContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
