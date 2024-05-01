import React, { useContext, useState } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  ButtonGroup,
  Container,
  Row,
  Col,
  ToggleButton,
  Badge,
  Stack,
  OverlayTrigger,
  Popover,
  Tooltip,
} from "react-bootstrap";
import { AbiCoder, Contract, Interface } from "ethers";
import axios from "axios";

import { AuthnProvContext, BACKEND_URL } from "../App";

import { FiUpload } from "react-icons/fi";
import Candidate_logo from "../assets/Candidate_logo.png";
import Wallet from "./Wallet";

const CandidateHome = () => {
  const { auth, setAuth, provider, setProvider } = useContext(AuthnProvContext);

  const dummycv = {
    uploadDate: "16/3/2024",
    edu: [
      "RMBI at University of Science and Technology",
      "DSE at Diocesan Girls' School",
    ],
    exp: ["Summer Analyst in JP Morgan Chase", "Finance Intern in Deloitte"],
    skills: [
      "Project Management",
      "Professsional Accounting",
      "Corperate Finance",
      "Communication",
      "MS Office",
    ],
  };

  const submitCV = async (e) => {
    const res = await axios.post(
      BACKEND_URL + "/api/resume/new/" + auth.address,
      { cv: dummycv }
    );
    console.log(res.data);
    setAuth({ ...auth, resume: [...auth?.resume, dummycv] });
  };

  return (
    <Container>
      <div className="d-flex justify-content-around align-items-center mb-4">
        <div className="d-flex justify-content-around align-items-center gap-5">
          <img src={Candidate_logo} width={200} height={200} />
          <div className="fs-3 text-center fw-bold mt-3 mb-2">
            Resume Explorer
          </div>
        </div>
        <div
          className="p-3 me-4 border border-dark"
          style={{ cursor: "pointer", borderRadius: 15 }}
        >
          <input
            type="file"
            id="courseCoverPic"
            className="d-none"
            onChange={submitCV}
          />
          <label htmlFor="courseCoverPic" style={{ cursor: "pointer" }}>
            <FiUpload style={{ fontSize: "5rem" }} />
          </label>
          <h4>Upload a new resume</h4>
        </div>
      </div>
      <Container className="text-muted fs-5">
        <Row className="mx-auto border-bottom border-3 my-2 align-items-end">
          <Col xs={2}>Upload Date</Col>
          <Col xs={8}>Key Information in Your Resume</Col>
          <Col xs={2}>Any accessors/ View-requestors?</Col>
        </Row>
        {auth?.resume?.reverse().map((cv) => (
          <Row className="mx-auto border border-3 my-3">
            <Col className="my-auto" xs={2}>
              <div className="py-auto">
                {new Date(cv?.createdAt).toDateString()}
              </div>
            </Col>

            <Container xs={8} as={Col}>
              {/* Education */}
              <Row className="d-flex justify-content-start align-items-start mb-1">
                <Col className="my-auto" xs={2}>
                  Education
                </Col>
                <Col className="d-flex flex-column align-items-start justify-content-center ms-2">
                  {cv?.edu.map((edu) => (
                    <li>{edu}</li>
                  ))}
                </Col>
              </Row>
              <hr className="w-100 p-0 m-1" />

              <Row className="d-flex justify-content-start align-items-start mb-1">
                <Col className="my-auto" xs={2}>
                  Experience
                </Col>
                <Col className="d-flex flex-column align-items-start justify-content-center ms-2">
                  {cv?.exp.map((exp) => (
                    <li>{exp}</li>
                  ))}
                </Col>
              </Row>
              <hr className="w-100 p-0 m-1" />

              <Row className="d-flex justify-content-start align-items-start mb-3">
                <Col className="my-auto" xs={2}>
                  Skills
                </Col>
                <Col className="d-flex flex-wrap align-items-start justify-content-start ms-2 mt-2 gap-2">
                  {cv?.skills.map((s) => (
                    <ToggleButton
                      variant="outline-dark"
                      checked={false}
                      className="pe-none py-1 px-2"
                    >
                      {s}
                    </ToggleButton>
                  ))}
                </Col>
              </Row>

              {/* <Stack direction="horizontal" gap={2}>
                <p className="my-auto me-5">Skills</p>
                {cv?.skills.map((s) => (
                  
                ))}
              </Stack> */}
            </Container>

            <Container xs={2} as={Col}>
              <Col className="d-flex flex-wrap align-items-start justify-content-center ms-2 mt-2 gap-2">
                {cv?.accessors?.map((u) => (
                  <DropdownButton
                    as={ButtonGroup}
                    title={u.name}
                    variant="success"
                    autoClose={false}
                  >
                    <Dropdown.Item onClick={() => console.log("clicking it")}>
                      Remove this company from the accessors list
                    </Dropdown.Item>
                  </DropdownButton>
                ))}
                {cv?.requestors?.map((u) => (
                  <DropdownButton
                    as={ButtonGroup}
                    title={u.name}
                    variant="info"
                    autoClose={false}
                  >
                    <Dropdown.Item onClick={() => console.log("clicking it")}>
                      Allow this company to view my Resume
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => console.log("clicking it")}>
                      Remove this requestor
                    </Dropdown.Item>
                  </DropdownButton>
                ))}
              </Col>
            </Container>
          </Row>
        ))}
      </Container>
      <Wallet />
    </Container>
  );
};
export default CandidateHome;
