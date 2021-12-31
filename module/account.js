const axios = require("axios");
const StellarSDK = require("stellar-sdk");
const { checkBalancesInServer } = require("./server");

function generateKeys() {
  // create a completely new and unique pair of keys
  return StellarSDK.Keypair.random();
}

async function createAccount() {
  // Fund a new account by adding 10.000 XLM to your account
  // because Stellar require accounts to hold at least 1 XLM
  // before they actually exist in the ledger.
  const pair = generateKeys();
  try {
    await axios(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(
        pair.publicKey()
      )}`
    );
    console.log("SUCCESS! You have a new account :)\n");
    return pair;
  } catch (err) {
    console.error(err);
  }
}

async function getBalances(publicKey) {
  const balances = await checkBalancesInServer(publicKey);
  console.log(`Balances for account ${publicKey}`);
  balances.forEach((balance) => {
    console.log(`Type: ${balance.asset_type} - Balance: ${balance.balance}`);
  });
}

module.exports = { createAccount, getBalances };
