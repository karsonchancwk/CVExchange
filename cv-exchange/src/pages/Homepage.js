import React, { useContext, useState } from "react";
import {
  Container,
  Col,
  Button,
  Card,
  Popover,
  Row,
  Form,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { BrowserProvider } from "ethers";
import axios from "axios";

import { FiUpload } from "react-icons/fi";
import { ImBin } from "react-icons/im";

import MetaMask from "/cv-exchange/src/assets/MetaMask.png";

import { AuthnProvContext, BACKEND_URL } from "../App";

import CandidateHome from "./CandidateHome";
import CompanyHome from "./CompanyHome";

const Homepage = () => {
  const { auth, setAuth, provider, setProvider } = useContext(AuthnProvContext);

  const [regForm, setRegForm] = useState({ name: "", role: "Candidate" });
  const [cv, setCV] = useState();

  const signIn = async (e) => {
    e.preventDefault();
    const cred = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (typeof window.ethereum !== "undefined")
      setProvider(new BrowserProvider(window.ethereum));

    const address = cred[0];
    console.log(address);

    const res = await axios.get(BACKEND_URL + "/api/user/signin/" + address);
    const user = res?.data?.result?.thisUser;
    console.log("user", user);
    setAuth({
      name: user?.name,
      role: user?.role,
      address: user._id,
      resume: user._resume,
      balance: user.balance.$numberDecimal,
    });
  };

  const uploadCV = (
    <>
      <input
        type="file"
        id="courseCoverPic"
        className="text-center uploadBox d-none"
        // onChange={(e) => setCV(e.target.files[0])}
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
    </>
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

  const signUp = async (e) => {
    e.preventDefault();
    const cred = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (typeof window.ethereum !== "undefined")
      setProvider(new BrowserProvider(window.ethereum));

    const address = cred[0];
    console.log(address);
    console.log(regForm);

    const result = await axios.post(
      BACKEND_URL + "/api/user/signup/" + address,
      regForm
    );
    const user = result?.data?.result?.newUser;
    setAuth({
      name: user?.name,
      role: user?.role,
      address: user._id,
      resume: [],
      balance: 0.0,
    });
  };

  //  Candidate View
  if (auth?.role === "Candidate") return <CandidateHome />;
  // Company View
  else if (auth?.role === "Company") return <CompanyHome provider={provider} />;
  // Not yet login
  else
    return (
      <Container>
        <div
          className="d-flex align-items-center justify-content-around p-1 w-100 vh-75"
          style={{ marginTop: "6.5rem" }}
        >
          <div onClick={signIn} style={{ cursor: "pointer" }}>
            <img src={MetaMask} height={300} />
            <h3>Sign in with Metamask</h3>
          </div>
          <div>Or</div>
          <Card className="mx-4">
            <Card.Header as="h4" className="px-4 py-2">
              Sign up a new account with Metamask
            </Card.Header>
            <Form>
              <Card.Body className="py-5">
                {/* Name */}
                <Form.Group as={Row} className="mb-4">
                  <Form.Label xs={3} className="mx-auto">
                    Name
                  </Form.Label>
                  <Col xs={9} className="mx-auto">
                    <Form.Control
                      className="text-center"
                      onChange={(e) =>
                        setRegForm({ ...regForm, name: e.target.value })
                      }
                    />
                  </Col>
                </Form.Group>

                {/* Role */}
                <Form.Group as={Row} className="mb-5">
                  <Form.Label xs={5} className="mx-auto">
                    You are signing up as
                  </Form.Label>
                  <ButtonGroup className="mx-auto">
                    {["Candidate", "Company"].map((radio, idx) => (
                      <ToggleButton
                        key={idx}
                        id={radio}
                        type="radio"
                        variant={regForm.role === radio ? "dark" : "light"}
                        value={radio}
                        checked={regForm.role === radio}
                        onChange={(e) =>
                          setRegForm({
                            ...regForm,
                            role: e.currentTarget.value,
                          })
                        }
                      >
                        {radio}
                      </ToggleButton>
                    ))}
                  </ButtonGroup>
                </Form.Group>

                <Button onClick={signUp}>Submit and connect Metamask</Button>
              </Card.Body>
            </Form>
          </Card>
        </div>
      </Container>
    );
};

export default Homepage;
