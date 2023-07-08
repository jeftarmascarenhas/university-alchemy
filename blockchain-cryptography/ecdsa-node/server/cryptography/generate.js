const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();

console.log("private: ", toHex(privateKey), "\n");

const publicKey = secp.getPublicKey(privateKey);

console.log("Public: ", toHex(publicKey));

// public: 04e447e6aa9985dc1afa9b0e01caade3e9083edbbe80ff3fef9ffe8accb4621be66fc42bf6106dd1f5297d7b5cc1d3ab394b4363b9e89ccb5e9a679d23abb3b7ad
// private: 5bda5297e2e7630faa1e71c6550dd6d72ffc5ae2f964ef274c23209d36c4fe5e

// public: 04ac858838cd31bc30aa94ec6a3fdbcf9b3fdbe68f33b840c81c05d87386e77c811ffa014d49d9dd1683f01ec6717bf0dd1d276cbfec52b4b7aa10006cc21f8052
// private: 883b8fb5f575ca4927c709220f6ad77d235fad42a6db998d689b1949e4d07433

// public: 0442c14b945f2836b16a0b5213c9856ccde8cc4f7b0a8e1e6e92f7077666a2da75f8af2b6f3fa9d2c77d7192c0f4901a48573ce818c8a38d98dc402cfcea3115a4
// private: d8165211caf14678eff0923efe8a70d387cd5ecebf8644b90bfc52fe02930f2f
