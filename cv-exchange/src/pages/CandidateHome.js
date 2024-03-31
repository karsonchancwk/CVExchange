import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
  Badge,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AbiCoder, Contract, Interface } from "ethers";

import Candidate_logo from "../assets/Candidate_logo.png";

const CandidateHome = () => {
  const [file, setfile] = useState();
  const cv = {
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

  return (
    <Container>
      <Col className="d-flex flex-column align-items-center">
        <img src={Candidate_logo} width={200} height={200} />
        <div className="fs-3 text-center fw-bold mt-3 mb-2">
          Resume Explorer
        </div>
      </Col>
      <Container className="text-muted fs-5">
        <Row className="mx-auto border-bottom border-3 my-2">
          <Col xs={2}>Upload Date</Col>
          <Col xs={10}>Key Information in Your Resume</Col>
        </Row>
        <Row className="mx-auto border border-3 my-3">
          <Col className="my-auto" xs={2}>
            <div className="py-auto">{cv?.uploadDate}</div>
          </Col>

          <Container xs={10} as={Col}>
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
        </Row>
        {/* {doclog.reverse().map(
          (cv) =>
            cv?.ownerID == auth._id && (
              <Row className="mx-auto border border-3 my-3">
                <Col xs={2}>{cv?.name}</Col>
                <Col xs={3}>{cv?.tokenId}</Col>
                <Col xs={3}>
                  <Stack direction="horizontal" gap={2}>
                    {cv?.accessors.map((accId) => (
                      <Badge pill bg="success">
                        acc[accId]?.name
                      </Badge>
                    ))}
                  </Stack>
                </Col>
                <Col xs={3}>
                  <Stack direction="horizontal" gap={2}>
                    {cv?.requestors.map((accId) => (
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip>
                            Click to accept him/her to access your Resume
                          </Tooltip>
                        }
                      >
                        <Badge
                          pill
                          bg="success"
                          onClick={() => acceptRequest(cv.tokenId, accId)}
                        >
                          {acc[accId]?.name}
                        </Badge>
                      </OverlayTrigger>
                    ))}
                  </Stack>
                </Col>
              </Row>
            )
        )} */}
      </Container>
    </Container>
  );
};
export default CandidateHome;
