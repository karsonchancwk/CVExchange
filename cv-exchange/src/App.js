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
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { ImBin } from "react-icons/im";

import Homepage from "./pages/Homepage";
import AgileSoteria from "./assets/AgileSoteria.png";

import "./App.css";

export const AuthContext = createContext(null);
export const BACKEND_URL = "http://localhost:5000";

function App() {
  const [provider, setProvider] = useState();
  const [auth, setAuth] = useState();
  const [regForm, setRegForm] = useState({ name: "", role: "Candidate" });

  const [cv, setCV] = useState();

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
      body: regForm,
    });
    console.log(result);
  };

  const getsigner = async () => {
    const signer = await provider.getSigner();
    console.log(signer);
  };

  const regAccPopover = (
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

  const uploadCVPopover = (
    <Popover>
      <Popover.Header as="h3">Upload your Resume</Popover.Header>
      <Popover.Body>
        {/* <Form>
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
        </Form> */}
        <input
          type="file"
          id="courseCoverPic"
          name="image"
          className="text-center uploadBox d-none"
          onChange={(e) => setCV(e.target.files[0])}
        />
        <label
          className="d-flex align-items-center justify-content-center mb-3"
          style={{
            padding: "2% 3%",
            margin: "1% 0",
            background: "#f3f5f5",
            borderRadius: "0.5rem",
            border: "1px solid rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            width: "100%",
            height: "fit-content",
            minHeight: "5rem",
            cursor: "pointer",
          }}
          htmlFor="courseCoverPic"
        >
          <FiUpload />
        </label>

        {cv && (
          <div className="d-flex align-items-center justify-content-between mb-3">
            <div>{cv?.name}</div>
            <ImBin />
          </div>
        )}

        <Button onClick={() => console.log(cv)}>Submit</Button>
      </Popover.Body>
    </Popover>
  );

  const callAPI = async () => {
    const result = await axios.post(BACKEND_URL + "/api/status", {
      dataa: "hihihi",
    });
    console.log(result?.data);
  };

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

              <Button variant="link" onClick={() => connectMetamask()}>
                Resume Explorer
              </Button>

              <Button onClick={() => callAPI()}>Call API</Button>

              {/* <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={regAccPopover}
              >
                <Button variant="light">Register your Metamask account</Button>
              </OverlayTrigger> */}

              <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={uploadCVPopover}
              >
                <Button variant="dark">Upload your Resume</Button>
              </OverlayTrigger>
            </div>
            <Routes>
              <Route
                path="/"
                exact
                element={<Homepage provider={provider} />}
              />
              {/* <Route path="/pagetwo" exact element={<PageTwo />} />  <Route path="/AddRemoveParti" exact element={<AddRemoveParti />} /> */}
            </Routes>
          </Container>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
