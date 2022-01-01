let EventSource = require("eventsource");

let es = new EventSource(
  "https://horizon-testnet.stellar.org/accounts/GAI3QZ66OXBIRFXAFFDOUFBV3RIAXIP46Y3ZKTEF2NJYPCUXPB6BYY63/payments"
);

es.onmessage = function (message) {
  let result = message.data ? JSON.parse(message.data) : message;
  console.log("New payment:");
  console.log(result);
};
es.onerror = function (error) {
  console.log("An error occurred!");
};
