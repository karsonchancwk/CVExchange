import React, { useContext, useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Contract, computeAddress } from "ethers";

import CandidateHome from "./CandidateHome";
import CompanyHome from "./CompanyHome";

const Homepage = ({ provider }) => {
  const auth = { role: "Candidate" };

  const [client, setClient] = useState();

  // const fetchVal = async () => {
  //   if (provider) {
  //     const contract = new Contract(
  //       CONTRACT_ADDRESS,
  //       ContractJSON.abi,
  //       provider
  //     );
  //     try {
  //       const data = await contract.get();
  //       console.log("data = " + data);
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   }
  // };

  return (
    <div>
      {/* <Button onClick={() => fetchVal()}>fetchVal</Button> */}

      {/* <Button onClick={() => console.log(client)}>print client</Button> */}

      {auth?.role === "Candidate" && (
        <CandidateHome provider={provider} client={client} />
      )}
      {auth?.role === "Company" && <CompanyHome provider={provider} />}
    </div>
  );
};

export default Homepage;
