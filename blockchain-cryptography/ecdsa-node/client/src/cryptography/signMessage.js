import * as secp from "ethereum-cryptography/secp256k1";
import hashMessage from "./hashMessage";
import { toHex } from "ethereum-cryptography/utils";

async function signMessage(message, privateKey) {
  const hash = hashMessage(message);
  const msgHex = toHex(hash);
  return secp.sign(msgHex, privateKey, { recovered: true });
}

export default signMessage;
