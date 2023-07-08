import { keccak256 } from "ethereum-cryptography/keccak";
import { utf8ToBytes } from "ethereum-cryptography/utils";

function hashMessage(message) {
  const bytes = utf8ToBytes(message);
  return keccak256(bytes);
}

export default hashMessage;
