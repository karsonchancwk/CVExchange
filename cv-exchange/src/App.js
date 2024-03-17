import React, { useState, createContext } from "react";
import { Container, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserProvider, Contract, computeAddress } from "ethers";

import Homepage from "./pages/Homepage";
import AgileSoteria from "./assets/AgileSoteria.png";

import "./App.css";

export const AuthContext = createContext(null);

function App() {
  const [provider, setProvider] = useState();
  const [auth, setAuth] = useState();

  const connectMetamask = async () => {
    const cred = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (typeof window.ethereum !== "undefined")
      setProvider(new BrowserProvider(window.ethereum));
    console.log(cred);
    setAuth(cred[0]);
    // console.log(window.ethereum);
  };

  const getsigner = async () => {
    const signer = await provider.getSigner();
    console.log(signer);
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
