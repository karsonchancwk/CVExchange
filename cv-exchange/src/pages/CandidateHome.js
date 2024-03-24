import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
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
      ["RMBI", "University of Science and Technology"],
      ["DSE", "Diocesan Girls' School"],
    ],
    exp: [
      ["Summer Analyst", "JP Morgan Chase"],
      ["Finance Intern", "Deloitte"],
    ],
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
        {/* <div className="fs-4 text-center fw-bold">
          Manage your Resume at ease
        </div> */}
        {/* <div className="d-flex justify-content-around my-4">
          <input
            type="file"
            onChange={(e) => {
              setfile(e.target.files[0]);
              console.log("uploaded sth");
            }}
          />
        </div> */}
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
          <Col xs={10}>
            <Row className="d-flex no-wrap my-3 gap-2">
              <Stack direction="horizontal" gap={2}>
                <p className="my-auto ">Experience</p>
                {cv?.exp.map((exp) => (
                  <Stack direction="horizontal" gap={1} className="mx-3">
                    <Badge pill bg="success">
                      {exp[0]}
                    </Badge>
                    at <Badge pill>{exp[1]}</Badge>
                  </Stack>
                ))}
              </Stack>

              <Stack direction="horizontal" gap={2}>
                <p className="my-auto">Education</p>
                {cv?.edu.map((edu) => (
                  <Stack direction="horizontal" gap={1} className="mx-3 wrap">
                    <Badge pill bg="success">
                      {edu[0]}
                    </Badge>
                    at <Badge pill>{edu[1]}</Badge>
                  </Stack>
                ))}
              </Stack>

              <Stack direction="horizontal" gap={2}>
                <p className="my-auto me-5">Skills</p>
                {cv?.skills.map((s) => (
                  <Badge pill bg="success">
                    {s}
                  </Badge>
                ))}
              </Stack>
            </Row>
          </Col>
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
