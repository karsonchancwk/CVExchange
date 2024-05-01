import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  ToggleButton,
  Modal,
  Badge,
  Popover,
  Stack,
  OverlayTrigger,
  InputGroup,
  Tooltip,
} from "react-bootstrap";

import axios from "axios";
import { AbiCoder, Contract, Interface } from "ethers";

import { AuthnProvContext, BACKEND_URL } from "../App";
import { FaWallet } from "react-icons/fa6";

const Wallet = () => {
  const { auth, setAuth, provider, setProvider } = useContext(AuthnProvContext);
  const [amt, setAmt] = useState(0.0);

  const topUp = async (e) => {
    e.preventDefault();
    console.log("clicking it");
    const res = await axios.post(
      BACKEND_URL + "/api/user/topup/" + auth.address,
      { amt: amt * 29000.0 }
    );
    const user = res?.data?.result?.thisUser;
    console.log("user", user);
    setAuth({ ...auth, balance: user.balance.$numberDecimal / 10.0 });
  };

  return (
    <OverlayTrigger
      placement="top"
      trigger="click"
      overlay={
        <Popover>
          <Popover.Header as="h3">Your Wallet</Popover.Header>
          <Popover.Body>
            Your Balance:{" "}
            {auth?.balance ? (auth?.balance / 2900).toFixed(8) : "0.00"} ETH
            <p className="text-muted">
              ({auth?.balance ? parseFloat(auth?.balance).toFixed(2) : "0.00"}{" "}
              USD)
            </p>
            <Form.Label htmlFor="topup" className="mt-2">
              Top up
            </Form.Label>
            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon3">ETH</InputGroup.Text>
              <Form.Control
                id="topup"
                onChange={(e) => setAmt(e.target.value)}
              />
            </InputGroup>
            <Button onClick={topUp}>Confirm</Button>
          </Popover.Body>
        </Popover>
      }
    >
      <div
        className="position-fixed bg-white d-flex justify-content-center align-content-center pe-auto"
        style={{
          bottom: 25,
          right: 25,
          width: 70,
          height: 70,
          borderRadius: "50%",
          boxShadow: "10px 5px 5px gray",
        }}
      >
        <FaWallet className="m-auto fs-1" />
      </div>
    </OverlayTrigger>
  );
};

export default Wallet;
