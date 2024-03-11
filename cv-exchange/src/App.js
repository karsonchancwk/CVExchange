import React, { useState, createContext } from "react";
import { Container, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { BrowserProvider, Contract, computeAddress } from "ethers";

import Homepage from "./pages/Homepage";
import AgileSoteria from "./assets/AgileSoteria.png";

import "./App.css";

function App() {
  const connectMetamask = async () => {
    const cred = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (typeof window.ethereum !== "undefined")
      setProvider(new BrowserProvider(window.ethereum));
    console.log(cred);
    console.log(window.ethereum);
  };

  const getsigner = async () => {
    const signer = await provider.getSigner();
    console.log(signer);
  };
  return (
    <div className="App">
      <BrowserRouter>
        {/* <AuthContext.Provider value={{ auth, setAuth }}>
          <AllAccounts.Provider value={{ acc, setAcc }}>
            <DocumentStore.Provider value={{ doclog, setDoclog }}> */}
        {/* <div className="d-flex vh-100">
                <Drawer /> 
                <div style={{ width: "-webkit-fill-available" }}>*/}
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
            <Button onClick={() => connectDB()}>connect DB</Button>

            {/* <DropdownButton
                    variant="outline-primary"
                    title={`Logged in as ${auth?.role} ${auth?.name}`}
                  >
                    {acc.map(
                      (a) =>
                        a.name &&
                        a._id != auth._id && (
                          <Dropdown.Item onClick={() => setAuth(a)}>
                            {a.role + " " + a.name}
                          </Dropdown.Item>
                        )
                    )}
                  </DropdownButton> */}
          </div>
          <Routes>
            <Route path="/" exact element={<Homepage provider={provider} />} />
            <Route path="/pagetwo" exact element={<PageTwo />} />
            <Route path="/AddRemoveParti" exact element={<AddRemoveParti />} />
          </Routes>
        </Container>
        {/*</div>
               </div> */}
        {/* </DocumentStore.Provider>
          </AllAccounts.Provider>
        </AuthContext.Provider> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
