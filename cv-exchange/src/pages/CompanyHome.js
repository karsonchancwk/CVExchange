import React, { useContext, useState } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import { BrowserProvider, Contract, computeAddress } from "ethers";

// import ContractJSON from "../artifacts/contracts/resumes_simplified.sol/ResumesSimplified.json";
// import CONTRACT_ADDRESS from "../assets/CONTRACT_ADDRESS";
// import { AuthContext, DocumentStore, AllAccounts } from "../App";
import Company_logo from "../assets/Company_logo.png";

const CompanyHome = (provider) => {
  const [file, setfile] = useState();
  const [cid, setCid] = useState("");
  const [tokenId, setTokenId] = useState();

  // NEEED SIGN USING SPECIFIC ACCOUNT
  // const requestAccess = async (tokenId) => {
  //   if (provider) {
  //     const contract = new Contract(
  //       CONTRACT_ADDRESS,
  //       ContractJSON.abi,
  //       provider
  //     );
  //     try {
  //       await contract.requestAccess(tokenId, auth.address);

  //       //CHECK IF SUCCESSFUL
  //       const requestorsList = await contract.accessRequestors(tokenId);
  //       console.log("RequestorsList = ", requestorsList);
  //       if (requestorsList?.includes(auth._id)) {
  //         doclog
  //           .filter((d) => d.tokenId == tokenId)[0]
  //           .requestors.append(auth._id);
  //         console.log("Request successful");
  //       } else alert("Request Unsuccessful");
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   } else alert("no provider");
  // };

  // Web3 version.js
  // const viewResume = async (tokenId) => {
  //   if (provider) {
  //     const contract = new Contract(
  //       CONTRACT_ADDRESS,
  //       ContractJSON.abi,
  //       provider
  //     );
  //     try {
  //       const tokenURI = await contract.viewResume(tokenId, auth.address);
  //       console.log("tokenURI = " + tokenURI);
  //       if (tokenURI !== undefined) {

  //       }
  //       return tokenURI;
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   } else alert("no provider");
  // };

  // Web2 Version let cheat for the time being

  // const Actions = (cv) => {
  //   if (cv?.accessors?.includes(auth?._id)) return <Button>View Resume</Button>;
  //   else if (cv?.requestors?.includes(auth?._id)) return "Waiting for approval";
  //   else
  //     return (
  //       <Button onClick={() => requestAccess(cv.tokenId)}>
  //         Request access
  //       </Button>
  //     );
  // };

  return (
    <Container>
      <Col className="align-items-center mb-4">
        <img src={Company_logo} width={200} height={200} />
        <div className="fs-4 text-center fw-bold">
          A more trusted place for you to seek talents.
        </div>
      </Col>
      <Container className="text-muted fs-3">
        <Row className="mx-auto border-bottom border-3 my-2">
          <Col xs={6}>Resumes</Col>
          <Col xs={3}>Token ID</Col>
          <Col xs={2}>Status</Col>
        </Row>
        {/* {doclog.reverse().map((cv) => (
          <Row className="mx-auto border border-3 my-3">
            <Col xs={6}>
              {acc[cv?.ownerID]?.role} {acc[cv?.ownerID]?.name} has uploaded a
              resume
            </Col>
            <Col xs={3}>{cv?.tokenId}</Col>
            <Col xs={2}>
              <Actions cv={cv} />
            </Col>
          </Row>
        ))} */}
      </Container>
    </Container>
  );
};

export default CompanyHome;
