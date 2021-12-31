const StellarSDK = require("stellar-sdk");
const { createAccount, getBalances } = require("./module/account");
const { server, checkBalancesInServer } = require("./module/server");
const { user1, user2 } = require("./keys");
const fs = require("fs");

(async () => {
  // creates a first account and checks its balance
  // this will be used as the origin / source account

  // const firstAccount = await createAccount(); // => the first time
  const firstAccount = StellarSDK.Keypair.fromSecret(user1.private);
  // await getBalances(firstAccount.publicKey());

  // creates a second account and checks its balance
  // this will be used as the destination account

  // const secondAccount = await createAccount(); // => the first time
  const secondAccount = StellarSDK.Keypair.fromSecret(user2.private);
  // await getBalances(secondAccount.publicKey());

  // CODIGO PARA HACER UNA TRANSACCION

  // API Call to query payments from determinated account
  const payments = server.payments().forAccount(secondAccount.publicKey());

  // If some payments have already been handled, start the results from the
  // last seen payment. If not, it shows the full list.
  // getLastPagingToken reads the "database"
  const lastPagingToken = getLastPagingToken();
  if (lastPagingToken) {
    payments.cursor(lastPagingToken);
  }

  // `stream` will send each recorded payment, one by one, then keep the
  // connection open and continue to send you new payments as they occur.
  // ---------------------------------------------------------------------
  // The results of the query are streamed.
  // This is the easiest way to watch for payments or other transactions.
  // Each existing payment is sent through the stream, one by one.
  // Once all existing payments have been sent,
  // the stream stays open and new payments are sent as they are made.
  payments.stream({
    onmessage: (payment) => {
      // savePagingToken saves the last paging_token in the "database"
      savePagingToken(payment.paging_token);

      if (payment.to !== secondAccount.publicKey()) {
        return;
      }

      let asset;

      if (payment.asset_type === "native") {
        asset = "lumens";
      } else {
        asset = payment.asset_code + ":" + payment.asset_issuer;
      }

      console.log(`${payment.amount} ${asset} from ${payment.from}`);
    },
    onerror: (err) => {
      console.log(err);
    },
  });

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

function savePagingToken(token) {
  fs.writeFileSync("./database.json", JSON.stringify(token));
}

function getLastPagingToken() {
  return JSON.parse(fs.readFileSync("./database.json", "utf-8"));
}
