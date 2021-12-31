const StellarSKD = require("stellar-sdk");
const server = new StellarSKD.Server("https://horizon-testnet.stellar.org");

async function checkBalancesInServer(publicKey) {
  const account = await server.loadAccount(publicKey);
  return account.balances;
}

exports.server = server;
exports.checkBalancesInServer = checkBalancesInServer;
