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

  return (
    <Container>
      <Col className="d-flex flex-column align-items-center">
        <img src={Candidate_logo} width={200} height={200} />
        <div className="fs-3 text-center fw-bold mt-3 mb-2">
          Start with being a Candidate
        </div>
        <div className="fs-4 text-center fw-bold">
          A more secure place for you to upload your Resume.
        </div>
        <div className="d-flex justify-content-around my-4">
          <input
            type="file"
            onChange={(e) => {
              setfile(e.target.files[0]);
              console.log("uploaded sth");
            }}
          />
          <Button>Dummy</Button>
        </div>
      </Col>
      <Container className="text-muted fs-4">
        <Row className="mx-auto border-bottom border-3 my-2">
          <Col xs={2}>Your Resumes</Col>
          <Col xs={3}>Token ID</Col>
          <Col xs={3}>Accessors</Col>
          <Col xs={3}>View Request</Col>
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
