import React, { useState, createContext } from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { parseEther } from "ethers";
import axios from "axios";

import { BiSolidUserCircle } from "react-icons/bi";

import Homepage from "./pages/Homepage";
import AgileSoteria from "/cv-exchange/src/assets/AgileSoteria.png";

import "./App.css";

export const AuthnProvContext = createContext(null);
export const BACKEND_URL = "http://localhost:5000";

function App() {
  const [provider, setProvider] = useState();
  const [auth, setAuth] = useState({ name: "", role: "", address: "" });

  // const logout = (e) => {
  //   e.preventDefault();
  //   setAuth({ name: "", role: "", address: "" });
  // };

  // const callAPI = async (e) => {
  //   e.preventDefault();
  //   const result = await axios.post(
  //     BACKEND_URL +
  //       "/api/user/signup/0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  //     {
  //       role: "Candidate",
  //       name: "Alice Au",
  //     }
  //   );
  //   console.log(result?.data);
  // };

  // const sendTx = async () => {
  //   const signer = await provider.getSigner();
  //   const transactionHash = await signer.sendTransaction({
  //     to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //     value: parseEther("5"),
  //   }); // not working very working
  //   console.log(transactionHash);
  // };

  return (
    <div className="App">
      <BrowserRouter>
        <AuthnProvContext.Provider
          value={{ auth, setAuth, provider, setProvider }}
        >
          <Container>
            {/* Header */}
            <div
              className="d-flex justify-content-between align-items-center p-3"
              style={{ width: "inherit" }}
            >
              <img src={AgileSoteria} className="me-auto" height={65} />

              {(auth?.address && (
                <div className="d-flex flex-column align-items-end">
                  <div className="d-flex gap-2">
                    <h4 className="ms-auto">{auth?.role + " " + auth?.name}</h4>
                    <BiSolidUserCircle className="d-inline fs-2" />
                  </div>
                  <div>Your address: {auth?.address}</div>
                </div>
              )) || <p>You are not yet logged in</p>}

              {/* <div className="d-flex flex-column align-items-end">
                <div className="d-flex gap-2">
                  <h4 className="ms-auto">Candidate Bob Stu</h4>
                  <BiSolidUserCircle className="d-inline fs-2" />
                </div>
                <div>Your address: 0x0x0x0x0x0x0x0x0x0xx0x0x</div>
              </div> */}

              {/* <Button onClick={callAPI}>callapi</Button> */}
              {/* <Button onClick={() => console.log(auth)}>printAuth</Button> */}

              {/* <Button variant="link" onClick={() => connectMetamask()}>
                Connect{provider && "ed"} to Metamask
              </Button>

              <Button variant="link" onClick={() => connectMetamask()}>
                Resume Explorer
              </Button> */}

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
