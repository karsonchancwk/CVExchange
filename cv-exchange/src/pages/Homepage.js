import React, { useContext, useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Contract, computeAddress } from "ethers";

import CandidateHome from "./CandidateHome";
import CompanyHome from "./CompanyHome";

const Homepage = ({ provider }) => {
  // const { auth, setAuth } = useContext(AuthContext);

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

  // const connectweb3Storage = async () => {
  //   const client_ = await create();
  //   setClient(client_);
  //   try {
  //     console.log("conncting web 3 storage");
  //     const res1 = await client_.login("wing.hcccc@gmail.com");
  //     console.log("res1", res1);

  //     const res2 = await client_.setCurrentSpace(
  //       "did:key:z6MkhSL8xPGYRyekTdL6baRATDgJXqpYhBdBKVwi1Ya4g2A4"
  //     );
  //     console.log("res2", res2);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  // useEffect(() => {
  //   connectweb3Storage();
  // }, []);

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
