import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

function getPublicAddress(privateKey) {
  const publicKey = secp.getPublicKey(privateKey);
  return toHex(publicKey);
}

export default getPublicAddress;
