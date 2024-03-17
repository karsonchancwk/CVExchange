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
import { BrowserProvider, Contract, computeAddress } from "ethers";

import Homepage from "./pages/Homepage";
import AgileSoteria from "./assets/AgileSoteria.png";

import "./App.css";

export const AuthContext = createContext(null);
export const BACKEND_URL = "localhost:5000";

function App() {
  const [provider, setProvider] = useState();
  const [auth, setAuth] = useState();
  const [regForm, setRegForm] = useState({ name: "", role: "Candidate" });

  const connectMetamask = async () => {
    const cred = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (typeof window.ethereum !== "undefined")
      setProvider(new BrowserProvider(window.ethereum));
    console.log(cred);
    setAuth(cred[0]);
    return cred[0];
  };

  const regNewAccount = async () => {
    const cred = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (typeof window.ethereum !== "undefined")
      setProvider(new BrowserProvider(window.ethereum));
    console.log(cred);
    setAuth(cred[0]);
    const address = cred[0];
    console.log(address);
    console.log(regForm);
    //
    const result = await fetch(BACKEND_URL + "/api/user/signup/" + address, {
      method: "POST",
      body: JSON.stringify(regForm),
    });
    console.log(result);
  };

  const getsigner = async () => {
    const signer = await provider.getSigner();
    console.log(signer);
  };

  const popover = (
    <Popover>
      <Popover.Header as="h3">
        Please enter your register details
      </Popover.Header>
      <Popover.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>You are signing up as</Form.Label>
            <ButtonGroup>
              {["Candidate", "Company"].map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={radio}
                  type="radio"
                  variant={regForm.role === radio ? "dark" : "light"}
                  value={radio}
                  checked={regForm.role === radio}
                  onChange={(e) =>
                    setRegForm({ ...regForm, role: e.currentTarget.value })
                  }
                >
                  {radio}
                </ToggleButton>
              ))}
            </ButtonGroup>
          </Form.Group>
          <Button onClick={regNewAccount}>Submit</Button>
        </Form>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="App">
      <BrowserRouter>
        <AuthContext.Provider value={{ auth, setAuth }}>
          <Container>
            <div
              className="d-flex justify-content-between align-items-center px-3 py-2"
              style={{ width: "inherit" }}
            >
              <img src={AgileSoteria} className="me-auto" height={65} />
              <Button variant="link" onClick={() => connectMetamask()}>
                Connect{provider && "ed"} to Metamask
              </Button>

              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
              >
                <Button variant="success">
                  Register your Metamask account
                </Button>
              </OverlayTrigger>

              <Button onClick={() => getsigner()}>connect DB</Button>
              {/* <Button onClick={() => connectDB()}>connect DB</Button> */}
            </div>
            <Routes>
              <Route
                path="/"
                exact
                element={<Homepage provider={provider} />}
              />
              {/* <Route path="/pagetwo" exact element={<PageTwo />} /> */}
              {/* <Route path="/AddRemoveParti" exact element={<AddRemoveParti />} /> */}
            </Routes>
          </Container>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
