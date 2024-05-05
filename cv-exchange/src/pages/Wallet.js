import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Form,
  Popover,
  OverlayTrigger,
  InputGroup,
} from "react-bootstrap";

import axios from "axios";
import { parseEther } from "ethers";

import { AuthnProvContext, BACKEND_URL } from "../App";
import { FaWallet } from "react-icons/fa6";

const Wallet = () => {
  const { auth, setAuth, provider, setProvider } = useContext(AuthnProvContext);
  const [amt, setAmt] = useState(0.0);
  const [ethusdt, setEthusdt] = useState();

  useEffect(() => {
    fetchRate();
  }, []);

  const fetchRate = async (e = null) => {
    e?.preventDefault();
    try {
      const rate = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT"
      );
      setEthusdt(parseFloat(rate?.data?.price));
    } catch (err) {
      alert("Could not fetch price for now. Price set at 29000.");
      setEthusdt(29000.0);
    }
  };

  const topUp = async (e) => {
    e.preventDefault();
    console.log("clicking it");
    try {
      const signer = await provider.getSigner();
      const transactionHash = await signer.sendUncheckedTransaction({
        to: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        value: parseEther(String(amt)),
      });
      console.log(transactionHash);
      const res = await axios.post(
        BACKEND_URL + "/api/user/topup/" + auth.address,
        { amt }
      );
      const user = res?.data?.result?.thisUser;
      console.log("user", user);
      setAuth({ ...auth, balance: user.balance.$numberDecimal });
      setAmt(0.0);
    } catch (err) {
      alert("The transaction is unsuccessful");
    }
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
            {auth?.balance ? parseFloat(auth?.balance).toFixed(8) : "0.00"} ETH
            <p className="text-muted">
              (
              {auth?.balance
                ? (parseFloat(auth?.balance) * ethusdt).toFixed(2)
                : "0.00"}{" "}
              USD)
            </p>
            <Form.Label htmlFor="topup" className="mt-2">
              Top up
            </Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">ETH</InputGroup.Text>
              <Form.Control
                id="topup"
                value={amt}
                onChange={(e) => setAmt(e.target.value)}
              />
            </InputGroup>
            <Button onClick={topUp} className="me-2">
              Confirm
            </Button>
            <Button variant="outline-primary" onClick={fetchRate}>
              Refresh rate
            </Button>
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
