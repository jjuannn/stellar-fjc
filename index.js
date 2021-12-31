const StellarSDK = require("stellar-sdk");
const { createAccount, getBalances } = require("./module/account");
const { server, checkBalancesInServer } = require("./module/server");

(async () => {
  // creates a first account and checks its balance
  // this will be used as the origin / source account
  const firstAccount = await createAccount();
  await getBalances(firstAccount.publicKey());

  // creates a second account and checks its balance
  // this will be used as the destination account
  const secondAccount = await createAccount();
  await getBalances(secondAccount.publicKey());

  const destinationID = secondAccount.publicKey();

  let transaction;

  // Check that the destination account exists
  // This step can be skipped, but if the account does not exist, you will
  // be charged the transaction fee (comision) when the destination fails
  server
    .loadAccount(destinationID)
    .catch((err) => {
      if (err instanceof StellarSDK.NotFoundError) {
        throw new Error("Cannot find account " + destinationID);
      } else {
        return err;
      }
    })
    .then(() => {
      // Load data for the account you are sending from.
      // An account can only perform one transaction at a time and has something called a sequence number,
      // which helps Stellar verify the order of transactions.
      // https://developers.stellar.org/docs/glossary/accounts/#sequence-number
      // A transaction’s sequence number needs to match the account’s sequence number,
      // so you need to get the account’s current sequence number from the network.
      return server.loadAccount(firstAccount.publicKey());
    })
    .then((sourceAccount) => {
      // Start building a transaction.
      // This requires an account object, not just an account ID,
      // because it will increment the account’s sequence number.
      transaction = new StellarSDK.TransactionBuilder(sourceAccount, {
        fee: StellarSDK.BASE_FEE,
        networkPassphrase: StellarSDK.Networks.TESTNET,
      })
        .addOperation(
          StellarSDK.Operation.payment({
            // destination: the account that will recieve the assets
            destination: destinationID,
            // asset - can be any asset issued on the network.
            asset: StellarSDK.Asset.native(),
            // the amount of assets - STRING NOT NUMBER
            amount: "10",
          })
        )
        // metadata - optional and stellar does not do anything with it
        // can be used for any purpose you'd like
        .addMemo(StellarSDK.Memo.text("Im testing the transactions!"))
        // timeout - will wait a maximum of 3 minutes to the transaction
        .setTimeout(180)
        // build the transaction
        .build();
      // the transaction needs to be signed
      // you have to pass your keypair to sign it using your private key.
      // this will verify that you authorized the transaction
      transaction.sign(firstAccount);
      // submit to the stellar network!
      return server.submitTransaction(transaction);
    })
    .then(async (results) => {
      // get the balances of the accounts post-transaction
      // to check that the values changed correctly
      await getBalances(firstAccount.publicKey());
      await getBalances(secondAccount.publicKey());
      console.log("Transaction completed: " + results);
    })
    .catch((err) => {
      console.error("Transaction failed: ", err);
    });
})();
