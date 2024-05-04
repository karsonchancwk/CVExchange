import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  ToggleButton,
  Modal,
  Badge,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { AbiCoder, Contract, Interface } from "ethers";
import axios from "axios";

import { AuthnProvContext, BACKEND_URL } from "../App";
import Wallet from "./Wallet";
import Company_logo from "../assets/Company_logo.png";

const CompanyHome = () => {
  const { auth, setAuth, provider, setProvider } = useContext(AuthnProvContext);

  const [allCV, setAllCV] = useState([]);
  const [modalCV, setModalCV] = useState(null);

  const fetchAllCV = async () => {
    const res = await axios.get(BACKEND_URL + "/api/resume/allcv");
    console.log(res?.data?.result?.allCV);

    setAllCV(res?.data?.result?.allCV);
  };
  useEffect(() => {
    fetchAllCV();
  }, []);

  const requestViewCV = async (cvid) => {
    console.log(cvid);
    const res = await axios.patch(
      BACKEND_URL + "/api/resume/addrequestor/" + auth.address,
      { cvid }
    );
    console.log(res?.data?.result);
    fetchAllCV();
    setModalCV(null);
  };

  const ThisModal = () => {
    const cv = modalCV;
    console.log(cv?.accessors.includes(auth.address));

    // He has access
    if (cv?.accessors.includes(auth.address))
      return (
        <Modal show={modalCV} onHide={() => setModalCV(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Details of the Resume</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col className="p-3">
              {/* Education */}
              <Row className="my-2 fs-6 ms-3">Uploaded by {cv.owner}</Row>
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
            </Col>
          </Modal.Body>
        </Modal>
      );
    // He is pending access
    else if (cv?.requestors.includes(auth.address))
      return (
        <Modal show={modalCV} onHide={() => setModalCV(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Opps!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mb-4">
            You have requested for access to this Resume. Please wait before the
            candidate agrees with it. You will get your tokens back if the
            candidate rejects your request.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setModalCV(null)}>
              Okay. Got it.
            </Button>
          </Modal.Footer>
        </Modal>
      );
    // He does not and is not requesting for an access
    else
      return (
        <Modal show={modalCV} onHide={() => setModalCV(null)}>
          <Modal.Header closeButton>
            <Modal.Title>Opps!</Modal.Title>
          </Modal.Header>
          <Modal.Body className="mb-4">
            You are not permitted by the Candidate to view the Resume. Do you
            wish to spend 1 USD to request viewing it? You will get your money
            back if the candidate reject your request.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalCV(null)}>
              Let me think about it.
            </Button>
            <Button
              variant="primary"
              onClick={(e) => {
                e.preventDefault();
                requestViewCV(cv._id);
              }}
            >
              Yes. I would like to learn more.
            </Button>
          </Modal.Footer>
        </Modal>
      );
  };

  return (
    <Container>
      <Col className="align-items-center mb-4">
        <img src={Company_logo} width={200} height={200} />
        <div className="fs-4 text-center fw-bold">
          A more trusted place for you to seek talents.
        </div>
      </Col>
      <Container className="text-muted fs-5 mb-5">
        <Row className="mx-auto border-bottom border-3 my-2">
          <Col xs={2}>Upload Date</Col>
          <Col xs={8}>Resumes</Col>
          <Col xs={2}>Remarks</Col>
        </Row>
        {allCV?.reverse().map((cv) => (
          <Row className="mx-auto border border-3 my-3">
            <Col className="my-auto" xs={2}>
              <div className="py-auto">
                {new Date(cv?.createdAt).toDateString()}
              </div>
            </Col>

            <Container xs={8} as={Col}>
              {/* Education */}
              <Row className="my-2 fs-6 ms-3">Uploaded by {cv.owner},</Row>
              <Row className="d-flex justify-content-start align-items-start mb-1">
                <Col className="my-auto" xs={2}>
                  Education
                </Col>
                <Col className="d-flex flex-column align-items-start justify-content-center ms-2">
                  {cv?.accessors.includes(auth.address) ? (
                    cv.edu.map((edu) => <li>{edu}</li>)
                  ) : (
                    <>
                      <li>{cv.edu[0]}</li>
                      <li>......</li>
                    </>
                  )}
                </Col>
              </Row>
              <hr className="w-100 p-0 m-1" />

              <Row className="d-flex justify-content-start align-items-start mb-1">
                <Col className="my-auto" xs={2}>
                  Experience
                </Col>
                <Col className="d-flex flex-column align-items-start justify-content-center ms-2">
                  {cv?.accessors.includes(auth.address) ? (
                    cv.exp.map((exp) => <li>{exp}</li>)
                  ) : (
                    <>
                      <li>{cv.exp[0]}</li>
                      <li>......</li>
                    </>
                  )}
                </Col>
              </Row>
              <hr className="w-100 p-0 m-1" />

              <Row className="d-flex justify-content-start align-items-start mb-3">
                <Col className="my-auto" xs={2}>
                  Skills
                </Col>
                <Col className="d-flex flex-wrap align-items-start justify-content-start ms-2 mt-2 gap-2">
                  {(cv?.accessors.includes(auth.address)
                    ? cv?.skills
                    : [cv?.skills[0], cv?.skills[1], "......"]
                  ).map((s) => (
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
            </Container>

            <Col className="my-auto px-2" xs={2}>
              {!cv?.accessors.includes(auth.address) &&
                !cv?.requestors.includes(auth.address) && (
                  <Button onClick={() => setModalCV(cv)}>View more</Button>
                )}
              {!cv?.accessors.includes(auth.address) &&
                cv?.requestors.includes(auth.address) &&
                "Pending Candidates' Approval"}
            </Col>
          </Row>
        ))}
        <ThisModal />
      </Container>
      <Wallet />
    </Container>
  );
};

export default CompanyHome;
