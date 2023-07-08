import { useState } from "react";
import server from "./server";
import getPublicAddress from "./cryptography/getPublicAddress";

function Wallet({ setPrivateKey, privateKey, balance, setBalance }) {
  const [publicAddress, setPublicAddress] = useState("");

  function setPublicKey(value) {
    if (value) {
      const publicKey = getPublicAddress(value);
      setPublicAddress(`${publicKey.slice(0, 6)}...${publicKey.slice(6, 12)}`);
    } else {
      setPublicAddress("");
    }
  }

  async function onChangePrivateKey(evt) {
    const privateAddress = evt.target.value;
    setPrivateKey(privateAddress);
    setPublicKey(privateAddress);
    const address = getPublicAddress(privateAddress);
    if (privateAddress) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      console.log("balance->", balance);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Private Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={privateKey}
          onChange={onChangePrivateKey}
        />
      </label>

      <label>
        Wallet Public Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={publicAddress}
          disabled
        />
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
