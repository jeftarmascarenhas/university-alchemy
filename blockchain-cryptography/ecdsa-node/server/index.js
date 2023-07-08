const express = require("express");
const { toHex } = require("ethereum-cryptography/utils");
const secp = require("ethereum-cryptography/secp256k1");
const app = express();
const cors = require("cors");
const port = 3042;

const recoverKey = require("./cryptography/recoverKey");

app.use(cors());
app.use(express.json());

const balances = {
  "04e447e6aa9985dc1afa9b0e01caade3e9083edbbe80ff3fef9ffe8accb4621be66fc42bf6106dd1f5297d7b5cc1d3ab394b4363b9e89ccb5e9a679d23abb3b7ad": 100,
  "04ac858838cd31bc30aa94ec6a3fdbcf9b3fdbe68f33b840c81c05d87386e77c811ffa014d49d9dd1683f01ec6717bf0dd1d276cbfec52b4b7aa10006cc21f8052": 50,
  "0442c14b945f2836b16a0b5213c9856ccde8cc4f7b0a8e1e6e92f7077666a2da75f8af2b6f3fa9d2c77d7192c0f4901a48573ce818c8a38d98dc402cfcea3115a4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log(address);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature } = req.body;
  const [sig, recoveryBit] = signature;

  const message = JSON.stringify({
    sender,
    amount: parseInt(amount),
    recipient,
  });

  const sigUint8 = new Uint8Array(Object.values(sig));

  const data = await recoverKey(message, sigUint8, recoveryBit);
  const signAddress = toHex(data);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (signAddress !== sender) {
    res.status(400).send({ message: "Unauthorize transfer!" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
